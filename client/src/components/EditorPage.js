import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

// List of supported languages
const LANGUAGES = [
  "python3",
  "java",
  "cpp",
  "nodejs",
  "c",
  "ruby",
  "go",
  "scala",
  "bash",
  "sql",
  "pascal",
  "csharp",
  "php",
  "swift",
  "rust",
  "r",
];

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python3");
  const codeRef = useRef(null);

  const Location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Socket connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: Location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== Location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      socketRef.current && socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, [Location.state?.username, navigate, roomId]);

  if (!Location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID is copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the room ID");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  const runCode = async () => {
    if (!codeRef.current || codeRef.current.trim() === '') {
      toast.error("Please write some code first!");
      return;
    }

    // Automatically open console to show output
    if (!isCompileWindowOpen) {
      setIsCompileWindowOpen(true);
    }

    setIsCompiling(true);
    setOutput("Compiling and running your code...");
    
    try {
      console.log("Sending code to compile:", {
        code: codeRef.current,
        language: selectedLanguage
      });

      const response = await axios.post("http://localhost:5001/compile", {
        code: codeRef.current,
        language: selectedLanguage,
      });
      
      console.log("Backend response:", response.data);
      
      if (response.data.error) {
        setOutput(`Error: ${response.data.error}`);
        toast.error("Code execution failed");
      } else if (response.data.output) {
        setOutput(response.data.output);
        toast.success("Code executed successfully!");
      } else {
        setOutput("Code executed but no output received");
        toast.success("Code executed successfully!");
      }
    } catch (error) {
      console.error("Error compiling code:", error);
      const errorMessage = error.response?.data?.error || error.message || "An error occurred";
      setOutput(`Error: ${errorMessage}`);
      toast.error("Failed to execute code");
    } finally {
      setIsCompiling(false);
    }
  };

  const toggleCompileWindow = () => {
    setIsCompileWindowOpen(!isCompileWindowOpen);
  };

  return (
    <div className="vh-100 d-flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <div className="d-flex flex-column" style={{ width: '280px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)' }}>
        {/* Header */}
        <div className="p-4 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-center mb-3">
            <div className="d-inline-block p-2 rounded-circle mb-2" style={{ 
              background: 'var(--primary-gradient)', 
              boxShadow: 'var(--shadow-glow)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                <path d="M12 3c0 1-1 2-2 2s-2 1-2 2 1 2 2 2 2 1 2 2 1-2 2-2 2-1 2-2-1-2-2-2-2-1-2-2z"/>
              </svg>
            </div>
            <h6 className="mb-1">Code<span className="gradient-text">Cast</span></h6>
            <small className="text-muted">Room: {roomId.substring(0, 8)}...</small>
          </div>
        </div>

        {/* Room Info */}
        <div className="p-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">Room ID</small>
            <button
              onClick={copyRoomId}
              className="btn btn-sm btn-outline-light"
              style={{ borderColor: 'var(--border-color)', fontSize: '12px' }}
              title="Copy Room ID"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Members */}
        <div className="flex-grow-1 p-3">
          <h6 className="mb-3 text-light">Active Members ({clients.length})</h6>
          <div className="overflow-auto" style={{ maxHeight: '300px' }}>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
          <button className="btn-premium btn-primary-premium w-100 mb-2" onClick={copyRoomId}>
            Share Room
          </button>
          <button className="btn-premium btn-secondary-premium w-100" onClick={leaveRoom}>
            Leave Room
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Editor Header */}
        <div className="d-flex justify-content-between align-items-center p-3" style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="d-flex align-items-center">
            <h6 className="mb-0 me-3">Editor</h6>
            <span className="badge" style={{ background: 'var(--accent-purple)' }}>{selectedLanguage}</span>
          </div>
          
          <div className="d-flex align-items-center gap-2">
            <select
              className="select-premium"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{ minWidth: '120px' }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <button
              onClick={runCode}
              className="btn-premium btn-primary-premium"
              disabled={isCompiling}
              style={{ minWidth: '100px' }}
            >
              {isCompiling ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Running...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Run Code
                </>
              )}
            </button>

            <button
              onClick={toggleCompileWindow}
              className="btn btn-outline-light"
              style={{ borderColor: 'var(--border-color)' }}
              title={isCompileWindowOpen ? "Hide Console" : "Show Console"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 4 5"/>
                <line x1="12" y1="19" x2="20" y2="19"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-grow-1">
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>

      {/* Floating Console Toggle Button */}
      <button
        className="position-fixed bottom-3 end-3 btn-premium btn-primary-premium"
        onClick={toggleCompileWindow}
        style={{ zIndex: 1050, borderRadius: '50%', width: '60px', height: '60px', padding: 0 }}
        title={isCompileWindowOpen ? "Hide Console" : "Show Console"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="4 17 10 11 4 5"/>
          <line x1="12" y1="19" x2="20" y2="19"/>
        </svg>
      </button>

      {/* Console/Output Panel */}
      <div
        className={`${
          isCompileWindowOpen ? "d-block" : "d-none"
        }`}
        style={{
          height: isCompileWindowOpen ? "35vh" : "0",
          background: 'var(--bg-tertiary)',
          borderTop: '1px solid var(--border-color)',
          transition: "height 0.3s ease-in-out",
          overflow: 'hidden'
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
          <h6 className="mb-0 text-light">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
              <polyline points="4 17 10 11 4 5"/>
              <line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
            Console Output ({selectedLanguage})
          </h6>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-light"
              style={{ borderColor: 'var(--border-color)' }}
              onClick={() => setOutput('')}
              title="Clear Console"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"/>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
              </svg>
            </button>
            <button
              className="btn btn-sm btn-outline-light"
              style={{ borderColor: 'var(--border-color)' }}
              onClick={toggleCompileWindow}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-3 h-100 overflow-auto">
          <pre className="text-light mb-0" style={{ fontFamily: 'var(--font-mono)' }}>
            {output || (
              <span className="text-muted">
                Output will appear here after running the code...
              </span>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
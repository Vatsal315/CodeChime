import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both the field is requried");
      return;
    }

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("room is created");
  };

  // when enter then also join
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'var(--bg-primary)' }}>
      {/* Animated Background */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: -1 }}>
        <div className="position-absolute" style={{ 
          top: '10%', 
          left: '10%', 
          width: '300px', 
          height: '300px', 
          background: 'var(--primary-gradient)', 
          borderRadius: '50%', 
          filter: 'blur(100px)', 
          opacity: 0.3,
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="position-absolute" style={{ 
          top: '60%', 
          right: '10%', 
          width: '250px', 
          height: '250px', 
          background: 'var(--secondary-gradient)', 
          borderRadius: '50%', 
          filter: 'blur(80px)', 
          opacity: 0.2,
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            {/* Header */}
            <div className="text-center mb-5 fade-in">
              <div className="mb-4">
                <div className="d-inline-block p-3 rounded-circle" style={{ 
                  background: 'var(--primary-gradient)', 
                  boxShadow: 'var(--shadow-glow)'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                    <path d="M12 3c0 1-1 2-2 2s-2 1-2 2 1 2 2 2 2 1 2 2 1-2 2-2 2-1 2-2-1-2-2-2-2-1-2-2z"/>
                  </svg>
                </div>
              </div>
              <h1 className="h2 mb-3">
                Code<span className="gradient-text">Cast</span>
              </h1>
              <p className="text-muted mb-0">Real-time code collaboration platform</p>
            </div>

            {/* Main Card */}
            <div className="glass-card p-4 slide-in-right">
              <div className="text-center mb-4">
                <h4 className="mb-3">Join or Create a Room</h4>
                <p className="text-muted small">Start coding together in real-time</p>
              </div>

              <div className="mb-3">
                <label className="form-label text-light mb-2">Room ID</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="input-premium"
                    placeholder="Enter room ID"
                    onKeyUp={handleInputEnter}
                  />
                  <button
                    onClick={generateRoomId}
                    className="btn btn-outline-light ms-2"
                    style={{ borderColor: 'var(--border-color)' }}
                    title="Generate new room ID"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 2v6h-6"/>
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
                      <path d="M3 22v-6h6"/>
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-light mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-premium"
                  placeholder="Enter your username"
                  onKeyUp={handleInputEnter}
                />
              </div>

              <button
                onClick={joinRoom}
                className="btn-premium btn-primary-premium w-100 mb-3"
              >
                Join Room
              </button>

              <div className="text-center">
                <p className="text-muted mb-2">Don't have a room ID?</p>
                <button
                  onClick={generateRoomId}
                  className="btn-premium btn-secondary-premium"
                >
                  Create New Room
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="row mt-5 text-center">
              <div className="col-4">
                <div className="p-3">
                  <div className="mb-2">
                    <span role="img" aria-label="rocket">🚀</span>
                  </div>
                  <small className="text-muted">Real-time Sync</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3">
                  <div className="mb-2">
                    <span role="img" aria-label="computer">💻</span>
                  </div>
                  <small className="text-muted">Code Editor</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3">
                  <div className="mb-2">
                    <span role="img" aria-label="lightning">⚡</span>
                  </div>
                  <small className="text-muted">Fast Compile</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
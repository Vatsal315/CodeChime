import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          lineWrapping: false,
          styleActiveLine: true,
          matchBrackets: true,
          indentUnit: 2,
          tabSize: 2,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Ctrl-/": "toggleComment",
            "Ctrl-F": "find",
            "F11": function(cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function(cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
          },
        }
      );
      // for sync the code
      editorRef.current = editor;

      editor.setSize(null, "100%");
      
      // Set welcome message
      const welcomeCode = `// Welcome to CodeCast! 🚀
// Start coding and collaborate in real-time

function welcome() {
  console.log("Happy Coding! 💻");
}

welcome();`;
      
      editor.setValue(welcomeCode);

      editorRef.current.on("change", (instance, changes) => {
        // console.log("changes", instance ,  changes );
        const { origin } = changes;
        const code = instance.getValue(); // code has value which we write
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, [onCodeChange, roomId, socketRef]);

  // data receive from server
  useEffect(() => {
    if (socketRef.current) {
      const socket = socketRef.current;
      socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
      return () => {
        socket.off(ACTIONS.CODE_CHANGE);
      };
    }
  }, [socketRef]);

  return (
    <div className="h-100 position-relative" style={{ background: 'var(--bg-primary)' }}>
      <textarea id="realtimeEditor"></textarea>
      
      {/* Editor Status Bar */}
      <div className="position-absolute bottom-0 start-0 end-0 p-2" style={{ 
        background: 'var(--bg-tertiary)', 
        borderTop: '1px solid var(--border-color)',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <div className="d-flex justify-content-between align-items-center">
          <span>JavaScript</span>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
}

export default Editor;
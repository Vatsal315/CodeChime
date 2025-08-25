import React from "react";
import Avatar from "react-avatar";

function Client({ username }) {
  const getRandomColor = (name) => {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c', 
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
      '#fa709a', '#fee140', '#30cfd0', '#330867'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="d-flex align-items-center p-2 rounded mb-2" style={{ 
      background: 'rgba(255, 255, 255, 0.03)', 
      border: '1px solid var(--border-color)',
      transition: 'all var(--transition-base)'
    }}>
      <div className="position-relative me-3">
        <Avatar 
          name={username} 
          size={40} 
          round="8px"
          color={getRandomColor(username)}
          textSizeRatio={2}
        />
        <div className="position-absolute bottom-0 end-0" style={{ 
          width: '12px', 
          height: '12px', 
          background: 'var(--accent-green)', 
          borderRadius: '50%', 
          border: '2px solid var(--bg-secondary)' 
        }}></div>
      </div>
      <div className="flex-grow-1">
        <div className="text-light fw-medium">{username}</div>
        <small className="text-muted">Active now</small>
      </div>
    </div>
  );
}

export default Client;
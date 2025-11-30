
import React, { useState } from "react";

const toBase64 = (str) => window.btoa(str);

export default function LoginModal({ onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = toBase64(`${username}:${password}`);
      const url = `https://wiki.ith.intel.com/rest/api/user?username=${(username)}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Sign in failed (status ${res.status})`);
      }

      const data = await res.json();
      const displayName = data?.displayName || username;

      // Persist minimal auth context for UI only; do not use token elsewhere
      localStorage.setItem('authDisplayName', displayName);

      // Optionally store the token if you plan to reuse later, but per request we won't add to other endpoints
      localStorage.setItem('authToken', token);

      // Notify parent with display name for showing in the header
      if (typeof onLogin === 'function') onLogin({ displayName });

      onClose();
    } catch (e) {
      console.error('Login error:', e);
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        {/* ✅ Cross Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        <h2>Login</h2>
        {error && (
          <div style={{ color: '#C0392B', fontSize: 12, marginBottom: 8 }}>{error}</div>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#68a5e7ff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

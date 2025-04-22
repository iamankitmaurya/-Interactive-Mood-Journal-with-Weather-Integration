import axios from "axios";
import React, { useState } from "react";

function RegisterForm({ onSwitch }) {
  const [username, setUsername] = useState(""); // <-- NEW
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username, // <-- Include username
        password,
      });
      alert("Registration successful! Please login.");
      onSwitch();
    } catch (err) {
      setError("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account? <button onClick={onSwitch}>Login here</button>
      </p>
    </div>
  );
}

export default RegisterForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>EduTrack</h1>
          <p>Faculty Management System</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <MdEmail className="input-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <MdLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

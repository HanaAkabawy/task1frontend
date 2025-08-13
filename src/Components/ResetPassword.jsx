import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPass.css"; 

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!token) {
      setErrorMessage("No token found. Please go back to Forgot Password.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/reset-password", {
        
        newPassword
      });

      setSuccessMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>

        {errorMessage && <p className="auth-message">{errorMessage}</p>}
        {successMessage && <p className="auth-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;

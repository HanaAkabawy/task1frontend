import React, { useState } from "react";
import axios from "axios";
import "./ForgotPass.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:8000/api/auth/forgot-password", { email });

      setSuccessMessage("Reset email sent! Please check your inbox.");
    } catch (err) {
      setErrorMessage(err.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>

        {errorMessage && <p className="auth-message error">{errorMessage}</p>}
        {successMessage && <p className="auth-message success">{successMessage}</p>}
      </div>
    </div>
  );
}

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
      const res = await axios.post("http://localhost:8000/api/auth/forgot-password", { email });

      if (res.data && res.data.token) {
        localStorage.setItem("resetToken", res.data.token);
        setSuccessMessage("Reset email sent! Redirecting to reset password page...");
        setTimeout(() => {
          window.location.href = "/resetpass";
        }, 2000);
      } else {
        setErrorMessage("Unexpected response from server.");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong.");
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

        {errorMessage && <p className="auth-message">{errorMessage}</p>}
        {successMessage && <p className="auth-message">{successMessage}</p>}
      </div>
    </div>
  );
}

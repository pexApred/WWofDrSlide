import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../../utils/mutations";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD, {
    onCompleted: (data) => {
      if (data.forgotPassword.success) {
        setSuccessMessage("Email sent successfully. Please check your inbox.");
        setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); 
    try {
      await forgotPassword({ variables: { email } });
    } catch (err) {
      console.error("Forgot Password Error:", err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        {successMessage && <p className="text-success">{successMessage}</p>}
        {error && <p className="text-danger">Error: {error.message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;

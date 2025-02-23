import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Account Created! Please login.");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "250px",
            padding: "8px",
            margin: "8px 0",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "250px",
            padding: "8px",
            margin: "8px 0",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            width: "100px",
            padding: "8px",
            backgroundColor: "#5c87ff",
            border: "none",
            borderRadius: "6px",
            color: "white",
            fontSize: "14px",
            cursor: "pointer",
            transition: "0.3s",
            fontWeight: "bold",
            display: "block",
            margin: "12px auto",
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter credentials or sign up!");
      navigate("/signup");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "inline-block", textAlign: "left" }}>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{
            width: "250px",
            padding: "10px",
            margin: "10px 0",
            border: "1.5px solid #bbb",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#f9f9f9",
            transition: "0.3s ease-in-out",
            boxShadow: "inset 1px 1px 3px rgba(0, 0, 0, 0.1)"
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
            padding: "10px",
            margin: "10px 0",
            border: "1.5px solid #bbb",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#f9f9f9",
            transition: "0.3s ease-in-out",
            boxShadow: "inset 1px 1px 3px rgba(0, 0, 0, 0.1)"
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
    display: "block",   // Centers the button
    margin: "12px auto" // Adds spacing & centers horizontally
  }}
>
  Login
</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span 
          onClick={() => navigate("/signup")} 
          style={{ cursor: "pointer", color: "blue" }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginPage;

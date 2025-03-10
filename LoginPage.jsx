import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Smart Spending Starts Here!</h2>
        <p style={styles.tagline}>Login to Your Account</p>

        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="email" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input}
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>

        <p style={styles.signupText}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} style={styles.link}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#FFF6E0", 
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    width: "400px", 
  },
  heading: {
    fontSize: "22px", 
    color: "#5C5470",
    marginBottom: "8px", 
    fontWeight: "bold",
    whiteSpace: "nowrap", 
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tagline: {
    fontSize: "15px", 
    color: "#666",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  tagline: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "12px",
    background: "#5C5470",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.3s",
  },
  buttonHover: {
    background: "#40394A",
  },
  signupText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#666",
  },
  link: {
    color: "#5C5470",
    fontWeight: "bold",
    cursor: "pointer",
  },
};


export default LoginPage;

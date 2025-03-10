import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      console.log("Sending request to backend...");

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      console.log("Response received:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Join Us Today!</h2>
        <p style={styles.tagline}>Start tracking your expenses with ease.</p>

        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
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
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>

        <p style={styles.signupText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={styles.link}>
            Log In
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
export default SignupPage;

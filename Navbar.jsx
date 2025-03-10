import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUser(null); 
    setTimeout(() => {
      navigate("/"); 
    }, 0);
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.welcomeText}>
        {user ? `Welcome, ${user.name}!` : "Personal Expense Manager"}
      </h2>

      <div style={styles.navLinks}>
  

        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        ) : (
          <>
            <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: { 
    background: "#E4DCCF", 
    padding: "15px 30px", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    borderRadius: "10px" 
  },
  welcomeText: { fontWeight: "bold", color: "#5C5470", margin: 0 },
  navLinks: { display: "flex", alignItems: "center", gap: "15px" },
  link: { textDecoration: "none", color: "#5C5470", fontWeight: "bold" },
  logoutBtn: { 
    background: "#FF4D4D", 
    border: "none", 
    padding: "8px 14px", 
    color: "white", 
    borderRadius: "8px", 
    cursor: "pointer",
    fontWeight: "bold"
  },
};

export default Navbar;

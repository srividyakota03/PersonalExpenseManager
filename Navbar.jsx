import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from local storage
    setUser(null); // Reset user state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h2>Personal Expense Manager</h2>
      <div className="nav-links">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <span className="username">Welcome, {user.name}!</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

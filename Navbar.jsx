import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Ensure this is imported if not already

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Personal Expense Manager</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;

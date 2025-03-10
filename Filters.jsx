import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={filterContainerStyle}>
      <h3 style={headingStyle}>Filters</h3>
      
      <div style={filterItemStyle}>
        <label style={labelStyle}>Select Frequency:</label>
        <select name="frequency" value={filters.frequency} onChange={handleChange} style={selectStyle}>
          <option value="7">Last Week</option>
          <option value="30">Last Month</option>
          <option value="365">Last Year</option>
        </select>
      </div>

      <div style={filterItemStyle}>
        <label style={labelStyle}>Type:</label>
        <select name="type" value={filters.type} onChange={handleChange} style={selectStyle}>
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
    </div>
  );
};

const filterContainerStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "350px",
  marginBottom: "20px",
};

const headingStyle = {
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "15px",
};

const filterItemStyle = {
  marginBottom: "10px",
};

const labelStyle = {
  fontWeight: "bold",
  marginRight: "10px",
};

const selectStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #999",
  width: "100%",
  cursor: "pointer",
};

export default Filters;

import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const TransactionForm = ({ fetchTransactions, transaction, closeForm }) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    amount: "",
    type: "Expense",
    category: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    const transactionData = {
      date: formData.date?.trim(),
      title: formData.title?.trim(),
      amount: Number(formData.amount),
      type: formData.type?.trim(),
      category: formData.category?.trim(),
    };

    if (!transactionData.date || !transactionData.title || !transactionData.amount || !transactionData.type || !transactionData.category) {
      setError("All fields are required.");
      return;
    }

    try {
      console.log("Sending transaction data:", transactionData);

      const response = await fetch(
        transaction?._id
          ? `http://localhost:5000/api/transactions/${transaction._id}`
          : "http://localhost:5000/api/transactions",
        {
          method: transaction ? "PUT" : "POST",
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(transactionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      await fetchTransactions();
      closeForm();
    } catch (error) {
      setError(error.message || "Failed to save transaction.");
      console.error("Transaction error:", error);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={formContainer}>
        <button onClick={closeForm} style={closeButton}>
          <FaTimes />
        </button>
        <h3 style={formHeading}>{transaction ? "Edit Transaction Details" : "Add Transaction Details"}</h3>

        {error && <p style={errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>Type</label>
          <select name="type" value={formData.type} onChange={handleChange} required style={selectStyle}>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>

          <label style={labelStyle}>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required style={selectStyle}>
            <option value="">Choose...</option>
            <option value="Groceries">Groceries</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Tip">Tip</option>
            <option value="Food">Food</option>
            <option value="Medical">Medical</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transportation">Transportation</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit" style={submitButton}>{transaction ? "Save" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const formContainer = {
  background: "#fff",
  padding: "25px",
  borderRadius: "8px",
  width: "350px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  position: "relative",
};

const closeButton = {
  background: "none",
  border: "none",
  position: "absolute",
  top: "10px",
  right: "10px",
  fontSize: "18px",
  cursor: "pointer",
  color: "#888",
};

const formHeading = {
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const errorMessage = {
  color: "red",
  fontSize: "14px",
  textAlign: "center",
  marginBottom: "10px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: "5px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginBottom: "15px",
};

const selectStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginBottom: "15px",
  cursor: "pointer",
};

const submitButton = {
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  marginTop: "10px",
};

export default TransactionForm;

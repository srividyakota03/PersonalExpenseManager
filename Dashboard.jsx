import React, { useState } from "react";
import { FaPlus, FaFilter, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-02-20", title: "Lunch", amount: "$15", type: "Expense", category: "Food" },
  ]);
  const [newTransaction, setNewTransaction] = useState({ date: "", title: "", amount: "", type: "Expense", category: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const toggleFilters = () => setShowFilters(!showFilters);

  const toggleForm = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setNewTransaction(transactions[index]);
      setShowForm(true);
    } else {
      setShowForm(!showForm);
      if (!showForm) {
        setEditingIndex(null);
        setNewTransaction({ date: "", title: "", amount: "", type: "Expense", category: "" });
      }
    }
  };

  const handleInputChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = () => {
    if (newTransaction.title && newTransaction.amount) {
      if (editingIndex !== null) {
        const updatedTransactions = [...transactions];
        updatedTransactions[editingIndex] = newTransaction;
        setTransactions(updatedTransactions);
      } else {
        setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
      }
      setShowForm(false);
      setEditingIndex(null);
      setNewTransaction({ date: "", title: "", amount: "", type: "Expense", category: "" });
    }
  };

  const handleDeleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="container">
        <div className="top-section">
          <button className="button filter-btn" onClick={toggleFilters}>
            <FaFilter /> Filters
          </button>
          <button className="button add-new-btn" onClick={() => toggleForm()}>
            <FaPlus /> Add New
          </button>
        </div>

        {/* Transaction Form */}
{showForm && (
  <div className="form-container">
    {/* Close Button (Red X) */}
    <button className="close-icon" onClick={() => setShowForm(false)}>
      <FaTimes />
    </button>

    <h3>{editingIndex !== null ? "Edit Transaction" : "Add New Transaction"}</h3>
    <input type="date" name="date" value={newTransaction.date} onChange={handleInputChange} placeholder="Date" />
    <input type="text" name="title" value={newTransaction.title} onChange={handleInputChange} placeholder="Title" />
    <input type="text" name="amount" value={newTransaction.amount} onChange={handleInputChange} placeholder="Amount" />
    <select name="type" value={newTransaction.type} onChange={handleInputChange}>
      <option>Expense</option>
      <option>Income</option>
    </select>
    <input type="text" name="category" value={newTransaction.category} onChange={handleInputChange} placeholder="Category" />
    <div className="form-buttons">
      <button className="button add-btn" onClick={handleAddTransaction}>
        {editingIndex !== null ? "Save" : "Add"}
      </button>
    </div>
  </div>
)}


        {showFilters && (
          <div className="filter-section">
            <label>Select Frequency:</label>
            <select>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
            
            <label>Type:</label>
            <select>
              <option>All</option>
              <option>Income</option>
              <option>Expense</option>
            </select>
            
            <button className="button danger" onClick={toggleFilters}>Close</button>
          </div>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.category}</td>
                  <td className="action-buttons">
                    <button onClick={() => toggleForm(index)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteTransaction(index)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

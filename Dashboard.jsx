import React, { useState, useEffect } from "react";
import { FaPlus, FaFilter, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import TransactionForm from "./TransactionForm";
import TransactionsTable from "./TransactionsTable";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({ frequency: "7", type: "All" });

  
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  
  useEffect(() => {
    if (!user || !user.token) {
      console.error("No user token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    console.log("Fetching transactions...");
    fetchTransactions();
  }, []); 

  const fetchTransactions = async () => {
    if (!user || !user.token) return;

    try {
      console.log("Using token for API request:", user.token);

      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]); 
    }
  };

  const handleAddOrUpdateTransaction = async (transaction) => {
    if (!user || !user.token) {
      console.error("No user token found when adding/updating transaction");
      navigate("/login");
      return;
    }

    
    const transactionData = {
      ...transaction,
      amount: Number(transaction.amount),
    };
  <button onClick={handleResetFilters} style={resetButtonStyle}>
  <FaRedo /> Reset Filters
  </button>
  const handleResetFilters = () => {
    setFilters({ frequency: "7", type: "All" }); 
    setFilteredTransactions(transactions); 
  };

    try {
      console.log(" Sending transaction data:", transactionData);

      const response = await fetch(
        transaction._id
          ? `http://localhost:5000/api/transactions/${transaction._id}`
          : "http://localhost:5000/api/transactions",
        {
          method: transaction._id ? "PUT" : "POST", 
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(transactionData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await fetchTransactions(); 
      setShowForm(false);
      setEditingTransaction(null); 
    } catch (error) {
      console.error("Error adding/updating transaction:", error);
    }
  };

 
  const handleDeleteTransaction = async (transactionId) => {
    if (!user || !user.token) {
      console.error("No user token found when deleting transaction");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${transactionId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await fetchTransactions(); 
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  
  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.type !== "All" && transaction.type !== filters.type) {
      return false;
    }

    const transactionDate = new Date(transaction.date);
    const now = new Date();
    const timeRange = parseInt(filters.frequency, 10); 

    const daysDifference = Math.floor((now - transactionDate) / (1000 * 60 * 60 * 24));
    return daysDifference <= timeRange;
  });
  
  
  return (
    <div style={dashboardStyle}>
      <div style={buttonContainerStyle}>
        <button onClick={() => setShowFilters(!showFilters)} style={filterButtonStyle}>
          <FaFilter /> Filters
        </button>
        <button onClick={() => { setEditingTransaction(null); setShowForm(true); }} style={addButtonStyle}>
          <FaPlus /> Add New
        </button>
        <button onClick={() => navigate("/charts")} style={chartsButtonStyle}>
          <FaChartLine /> Charts
        </button>
      </div>

      {showFilters && <Filters filters={filters} setFilters={setFilters} />}

      
      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          fetchTransactions={fetchTransactions}
          onSave={handleAddOrUpdateTransaction}
          closeForm={() => { setShowForm(false); setEditingTransaction(null); }}
        />
      )}

      <TransactionsTable
        transactions={filteredTransactions}
        onEdit={(transaction) => { setEditingTransaction(transaction); setShowForm(true); }}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
};

const dashboardStyle = {
  padding: "20px",
  background: "#F8F9FA",
  minHeight: "100vh",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const filterButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const addButtonStyle = {
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const chartsButtonStyle = {
  backgroundColor: "#FFA500",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const resetButtonStyle = {
  backgroundColor: "#FF4D4D",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};


export default Dashboard;

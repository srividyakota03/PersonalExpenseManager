import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const ChartsPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user || !user.token) {
        console.error("User not authenticated.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const getChartData = (type) => {
    const filteredTransactions = transactions.filter((t) => t.type === type);
    const categoryTotals = {};

    filteredTransactions.forEach((t) => {
      if (categoryTotals[t.category]) {
        categoryTotals[t.category] += t.amount;
      } else {
        categoryTotals[t.category] = t.amount;
      }
    });

    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: type,
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#36A2EB", "#4BC0C0", "#9966FF", "#FFCE56", "#FF6384", "#FF9F40",
          ],
        },
      ],
    };
  };

  return (
    <div style={{ padding: "20px", background: "#d0dce7", minHeight: "100vh", textAlign: "center" }}>
      <button
        style={{
          background: "#6da7ff",
          padding: "8px 15px",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
        onClick={() => navigate("/")}
      >
        Back to Dashboard
      </button>
      <h2>Financial Summary</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ width: "300px", background: "white", padding: "20px", borderRadius: "10px" }}>
          <h3>Income Distribution</h3>
          <Doughnut data={getChartData("Income")} />
        </div>
        <div style={{ width: "300px", background: "white", padding: "20px", borderRadius: "10px" }}>
          <h3>Expense Distribution</h3>
          <Doughnut data={getChartData("Expense")} />
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TransactionsTable = ({ transactions, onEdit, onDelete }) => {
  return (
    <div style={{ background: "#E4DCCF", padding: "20px", borderRadius: "12px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.title}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category}</td>
              <td>
                <button onClick={() => onEdit(transaction)}><FaEdit /></button>
                <button onClick={() => onDelete(transaction.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;

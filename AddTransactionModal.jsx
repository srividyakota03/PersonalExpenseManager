import { useState } from "react";

function AddTransactionModal({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!title || !amount || !category || !date) {
      alert("All fields are required!");
      return;
    }
    onAdd({ title, amount, category, date });
  };

  return (
    <div className="modal">
      <h3>Add Transaction</h3>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
      </select>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddTransactionModal;

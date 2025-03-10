import Transaction from "../models/Transaction.js";

// ✅ Add transaction function
export const addTransaction = async (req, res) => {
  try {
    console.log("Received request:", req.body);

    const { date, title, amount, type, category } = req.body;

    if (!date || !title || !amount || !type || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a number" });
    }

    const transaction = new Transaction({
      user: req.user._id,
      date,
      title,
      amount,
      type,
      category,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("🚨 Backend Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Fetch transactions function
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("🚨 Backend Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

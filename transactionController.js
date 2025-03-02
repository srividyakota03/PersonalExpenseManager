import Transaction from "../models/TransactionModel.js";

// Add Transaction
export const addTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;

  const transaction = new Transaction({
    user: req.user.id,
    type,
    amount,
    category,
    description,
    date,
  });

  const savedTransaction = await transaction.save();
  res.status(201).json(savedTransaction);
};

// Get Transactions for a User
export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
  res.json(transactions);
};

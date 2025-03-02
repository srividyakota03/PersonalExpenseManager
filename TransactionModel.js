import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true, enum: ["income", "expense"] },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;

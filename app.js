import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./DB/Database.js";
import userRoutes from "./Routers/userRouter.js";
import transactionRoutes from "./Routers/Transactions.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// ✅ Correct CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // ✅ Allow only frontend URL
  methods: "GET, POST, PUT, DELETE",
  credentials: true, // ✅ Allow cookies & authentication headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

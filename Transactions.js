import express from "express";
import { addTransaction, getTransactions } from "../controllers/transactionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addTransaction);
router.get("/get", protect, getTransactions);

export default router;

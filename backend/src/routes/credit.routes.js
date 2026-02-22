import express from "express";
import {
  getCreditBalance,
  getTransactionHistory,
  getCreditStats,
  addBonusCredits,
  deductCredits,
  getLeaderboard,
} from "../controllers/credit.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Get credit balance
router.get("/balance/:facultyId", getCreditBalance);

// Get transaction history
router.get("/transactions/:facultyId", getTransactionHistory);

// Get credit statistics
router.get("/stats/:facultyId", getCreditStats);

// Get leaderboard
router.get("/leaderboard", getLeaderboard);

// Admin only: Add bonus credits
router.post("/bonus/:facultyId", addBonusCredits);

// Admin only: Deduct credits (penalty)
router.post("/deduct/:facultyId", deductCredits);

export default router;

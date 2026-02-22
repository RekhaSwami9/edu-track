import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  cancelLeave,
} from "../controllers/leave.controller.js";

const router = express.Router();

// Protected routes
router.post("/apply", protect, applyLeave);
router.get("/my-leaves", protect, getMyLeaves);
router.get("/all", protect, getAllLeaves);
router.patch("/:leaveId/status", protect, updateLeaveStatus);
router.delete("/:leaveId", protect, cancelLeave);

export default router;

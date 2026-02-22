import express from "express";
import {
  requestSubstitution,
  getMySubstitutionRequests,
  getMySubstitutions,
  getPendingNotifications,
  acceptSubstitution,
  declineSubstitution,
  completeSubstitution,
  cancelSubstitution,
  getAllSubstitutions,
  getSubstitutionStats,
} from "../controllers/substitution.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Request a new substitution
router.post("/request", requestSubstitution);

// Get my substitution requests (as requester)
router.get("/my-requests", getMySubstitutionRequests);

// Get my assigned substitutions (as substitute)
router.get("/my-substitutions", getMySubstitutions);

// Get pending notifications
router.get("/notifications", getPendingNotifications);

// Accept a substitution
router.post("/:substitutionId/accept", acceptSubstitution);

// Decline a substitution
router.post("/:substitutionId/decline", declineSubstitution);

// Mark as completed
router.post("/:substitutionId/complete", completeSubstitution);

// Cancel substitution
router.post("/:substitutionId/cancel", cancelSubstitution);

// Get all substitutions (admin only)
router.get("/all", getAllSubstitutions);

// Get substitution statistics
router.get("/stats", getSubstitutionStats);

export default router;

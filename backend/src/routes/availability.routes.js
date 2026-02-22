import express from "express";
import {
  getAvailability,
  updateAvailability,
  getAvailableFaculties,
  toggleAvailabilityStatus,
} from "../controllers/availability.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Get/update faculty's own availability
router.get("/:facultyId", getAvailability);
router.put("/:facultyId", updateAvailability);

// Toggle availability status (active/inactive)
router.patch("/:facultyId/toggle", toggleAvailabilityStatus);

// Get available faculties for a specific time slot
router.get("/find/available", getAvailableFaculties);

export default router;

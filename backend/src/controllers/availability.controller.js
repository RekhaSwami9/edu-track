import Availability from "../models/Availability.model.js";
import User from "../models/User.model.js";

// Get faculty's availability
export const getAvailability = async (req, res) => {
  try {
    const { facultyId } = req.params;

    // If facultyId is 'me', use current user's ID
    const targetFacultyId = facultyId === "me" ? req.user._id : facultyId;

    // Check if user is requesting their own or is admin
    if (
      targetFacultyId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own availability",
      });
    }

    let availability = await Availability.findOne({
      faculty: targetFacultyId,
    });

    // If no availability exists, create default empty one
    if (!availability) {
      availability = await Availability.create({
        faculty: targetFacultyId,
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        isActive: true,
      });
    }

    res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching availability",
      error: error.message,
    });
  }
};

// Update faculty's availability
export const updateAvailability = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      isActive,
    } = req.body;

    // Check permissions
    const targetFacultyId = facultyId === "me" ? req.user._id : facultyId;
    if (
      targetFacultyId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own availability",
      });
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const days = {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    };

    for (const [day, slots] of Object.entries(days)) {
      if (slots && Array.isArray(slots)) {
        for (const slot of slots) {
          if (
            !timeRegex.test(slot.startTime) ||
            !timeRegex.test(slot.endTime)
          ) {
            return res.status(400).json({
              success: false,
              message: `Invalid time format in ${day}. Use HH:MM format (e.g., 10:00)`,
            });
          }
          if (slot.startTime >= slot.endTime) {
            return res.status(400).json({
              success: false,
              message: `Start time must be before end time in ${day}`,
            });
          }
        }
      }
    }

    // Find and update or create new
    let availability = await Availability.findOneAndUpdate(
      { faculty: targetFacultyId },
      {
        monday: monday || [],
        tuesday: tuesday || [],
        wednesday: wednesday || [],
        thursday: thursday || [],
        friday: friday || [],
        saturday: saturday || [],
        sunday: sunday || [],
        isActive: isActive !== undefined ? isActive : true,
      },
      { new: true, upsert: true },
    );

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating availability",
      error: error.message,
    });
  }
};

// Get all available faculties for a specific time slot
export const getAvailableFaculties = async (req, res) => {
  try {
    const { date, startTime, endTime, department, subject } = req.query;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Date, startTime, and endTime are required",
      });
    }

    const targetDate = new Date(date);
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const dayName = dayNames[targetDate.getDay()];

    // Build query to find faculties available on that day and time
    const query = {
      isActive: true,
      [dayName]: {
        $elemMatch: {
          startTime: { $lte: startTime },
          endTime: { $gte: endTime },
        },
      },
    };

    const availabilities = await Availability.find(query).populate(
      "faculty",
      "name email department subjects credits",
    );

    // Filter by department and subject if provided
    let availableFaculties = availabilities.map((avail) => avail.faculty);

    if (department) {
      availableFaculties = availableFaculties.filter(
        (f) => f.department === department,
      );
    }

    if (subject) {
      availableFaculties = availableFaculties.filter((f) =>
        f.subjects.includes(subject),
      );
    }

    // Sort by credits (ascending) to prioritize faculties with fewer credits
    availableFaculties.sort((a, b) => a.credits - b.credits);

    res.status(200).json({
      success: true,
      count: availableFaculties.length,
      data: availableFaculties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching available faculties",
      error: error.message,
    });
  }
};

// Toggle availability status (active/inactive)
export const toggleAvailabilityStatus = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const targetFacultyId = facultyId === "me" ? req.user._id : facultyId;

    // Check permissions
    if (
      targetFacultyId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const availability = await Availability.findOne({
      faculty: targetFacultyId,
    });

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found",
      });
    }

    availability.isActive = !availability.isActive;
    await availability.save();

    res.status(200).json({
      success: true,
      message: `Availability ${availability.isActive ? "activated" : "deactivated"}`,
      data: availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling availability status",
      error: error.message,
    });
  }
};

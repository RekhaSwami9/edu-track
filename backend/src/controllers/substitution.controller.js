import Substitution from "../models/Substitution.model.js";
import User from "../models/User.model.js";
import Availability from "../models/Availability.model.js";
import CreditTransaction from "../models/CreditTransaction.model.js";
import Leave from "../models/Leave.model.js";

// Request a substitution (when faculty is on leave)
export const requestSubstitution = async (req, res) => {
  try {
    const {
      subject,
      department,
      className,
      date,
      startTime,
      endTime,
      useCredits,
      creditsToUse,
      relatedLeaveId,
      notes,
    } = req.body;

    const requestingFacultyId = req.user._id;

    // Validate required fields
    if (
      !subject ||
      !department ||
      !className ||
      !date ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: subject, department, className, date, startTime, endTime",
      });
    }

    // Check if user has enough credits if they want to use credits
    if (useCredits) {
      const user = await User.findById(requestingFacultyId);
      if (user.credits < (creditsToUse || 1)) {
        return res.status(400).json({
          success: false,
          message: "Insufficient credits",
          currentCredits: user.credits,
          required: creditsToUse || 1,
        });
      }
    }

    // Create substitution request
    const substitution = await Substitution.create({
      requestingFaculty: requestingFacultyId,
      subject,
      department,
      className,
      date: new Date(date),
      startTime,
      endTime,
      status: "pending",
      assignmentType: useCredits ? "credit_based" : "volunteer",
      creditsUsed: useCredits ? creditsToUse || 1 : 0,
      relatedLeave: relatedLeaveId || null,
      notes: notes || "",
    });

    // If using credits, try to auto-assign
    if (useCredits) {
      const autoAssigned = await tryAutoAssign(substitution, creditsToUse || 1);
      if (autoAssigned) {
        return res.status(201).json({
          success: true,
          message: "Substitution created and auto-assigned successfully",
          data: substitution,
        });
      }
    }

    // Otherwise, find and notify available faculties
    await notifyAvailableFaculties(substitution);

    res.status(201).json({
      success: true,
      message: "Substitution request created and notifications sent",
      data: substitution,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating substitution request",
      error: error.message,
    });
  }
};

// Try to auto-assign substitution using credits
const tryAutoAssign = async (substitution, creditsToUse) => {
  try {
    // Find available faculties
    const targetDate = new Date(substitution.date);
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

    const availabilities = await Availability.find({
      isActive: true,
      [dayName]: {
        $elemMatch: {
          startTime: { $lte: substitution.startTime },
          endTime: { $gte: substitution.endTime },
        },
      },
    }).populate("faculty", "name email credits department subjects");

    // Filter by department and subject compatibility
    let availableFaculties = availabilities
      .map((avail) => avail.faculty)
      .filter((faculty) => {
        // Exclude requesting faculty
        if (
          faculty._id.toString() === substitution.requestingFaculty.toString()
        ) {
          return false;
        }
        // Check department match
        if (faculty.department !== substitution.department) {
          return false;
        }
        // Check subject compatibility (if faculty teaches this subject)
        if (!faculty.subjects.includes(substitution.subject)) {
          return false;
        }
        return true;
      });

    if (availableFaculties.length === 0) {
      return false;
    }

    // Sort by credits (ascending) to prioritize faculty with fewer credits
    availableFaculties.sort((a, b) => a.credits - b.credits);

    // Select the faculty with lowest credits
    const selectedFaculty = availableFaculties[0];

    // Update substitution
    substitution.substitutingFaculty = selectedFaculty._id;
    substitution.status = "accepted";
    substitution.assignmentType = "credit_based";
    await substitution.save();

    // Deduct credits from requesting faculty
    const requestingFaculty = await User.findById(
      substitution.requestingFaculty,
    );
    requestingFaculty.credits -= creditsToUse;
    await requestingFaculty.save();

    // Create credit transaction for requesting faculty (used)
    await CreditTransaction.create({
      faculty: substitution.requestingFaculty,
      type: "used",
      amount: creditsToUse,
      description: `Used ${creditsToUse} credits for auto-assigned substitution`,
      substitution: substitution._id,
      balanceAfter: requestingFaculty.credits,
    });

    // Add credits to substituting faculty
    selectedFaculty.credits += 1; // Earn 1 credit for taking substitution
    selectedFaculty.totalSubstitutionsTaken += 1;
    await selectedFaculty.save();

    // Create credit transaction for substituting faculty (earned)
    await CreditTransaction.create({
      faculty: selectedFaculty._id,
      type: "earned",
      amount: 1,
      description: `Earned 1 credit for accepting substitution (auto-assigned)`,
      substitution: substitution._id,
      balanceAfter: selectedFaculty.credits,
    });

    // Update requesting faculty's stats
    requestingFaculty.totalSubstitutionsGiven += 1;
    await requestingFaculty.save();

    return true;
  } catch (error) {
    console.error("Auto-assign error:", error);
    return false;
  }
};

// Notify available faculties about substitution request
const notifyAvailableFaculties = async (substitution) => {
  try {
    const targetDate = new Date(substitution.date);
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

    const availabilities = await Availability.find({
      isActive: true,
      [dayName]: {
        $elemMatch: {
          startTime: { $lte: substitution.startTime },
          endTime: { $gte: substitution.endTime },
        },
      },
    }).populate("faculty", "name email department subjects");

    // Filter compatible faculties
    const compatibleFaculties = availabilities
      .map((avail) => avail.faculty)
      .filter((faculty) => {
        if (
          faculty._id.toString() === substitution.requestingFaculty.toString()
        ) {
          return false;
        }
        if (faculty.department !== substitution.department) {
          return false;
        }
        if (!faculty.subjects.includes(substitution.subject)) {
          return false;
        }
        return true;
      });

    // Add to notified list
    substitution.notifiedFaculties = compatibleFaculties.map((faculty) => ({
      faculty: faculty._id,
      notifiedAt: new Date(),
    }));
    substitution.status = "notified";
    await substitution.save();

    // TODO: Send actual notifications (email/push) here
    console.log(
      `Notified ${compatibleFaculties.length} faculties about substitution ${substitution._id}`,
    );
  } catch (error) {
    console.error("Notification error:", error);
  }
};

// Get all substitution requests for a faculty (as requester)
export const getMySubstitutionRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { requestingFaculty: req.user._id };
    if (status) query.status = status;

    const substitutions = await Substitution.find(query)
      .populate("substitutingFaculty", "name email department")
      .populate("notifiedFaculties.faculty", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Substitution.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: substitutions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching substitution requests",
      error: error.message,
    });
  }
};

// Get substitutions assigned to faculty (as substitute)
export const getMySubstitutions = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { substitutingFaculty: req.user._id };
    if (status) query.status = status;

    const substitutions = await Substitution.find(query)
      .populate("requestingFaculty", "name email department")
      .sort({ date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Substitution.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: substitutions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching assigned substitutions",
      error: error.message,
    });
  }
};

// Get pending substitution notifications for faculty
export const getPendingNotifications = async (req, res) => {
  try {
    // Find substitutions where this faculty is in notified list but hasn't responded
    const substitutions = await Substitution.find({
      status: "notified",
      "notifiedFaculties.faculty": req.user._id,
      "notifiedFaculties.responded": false,
      requestingFaculty: { $ne: req.user._id },
    })
      .populate("requestingFaculty", "name email department")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: substitutions.length,
      data: substitutions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

// Accept a substitution request
export const acceptSubstitution = async (req, res) => {
  try {
    const { substitutionId } = req.params;
    const facultyId = req.user._id;

    const substitution = await Substitution.findById(substitutionId);

    if (!substitution) {
      return res.status(404).json({
        success: false,
        message: "Substitution not found",
      });
    }

    if (
      substitution.status !== "notified" &&
      substitution.status !== "pending"
    ) {
      return res.status(400).json({
        success: false,
        message: `Cannot accept substitution with status: ${substitution.status}`,
      });
    }

    // Check if faculty was notified
    const notificationIndex = substitution.notifiedFaculties.findIndex(
      (nf) => nf.faculty.toString() === facultyId.toString(),
    );

    if (notificationIndex === -1) {
      return res.status(403).json({
        success: false,
        message: "You were not notified about this substitution",
      });
    }

    // Update substitution
    substitution.substitutingFaculty = facultyId;
    substitution.status = "accepted";
    substitution.assignmentType = "volunteer";
    substitution.notifiedFaculties[notificationIndex].responded = true;
    substitution.notifiedFaculties[notificationIndex].response = "accepted";
    substitution.notifiedFaculties[notificationIndex].respondedAt = new Date();
    await substitution.save();

    // Add credits to substituting faculty
    const substitutingFaculty = await User.findById(facultyId);
    substitutingFaculty.credits += 1;
    substitutingFaculty.totalSubstitutionsTaken += 1;
    await substitutingFaculty.save();

    // Create credit transaction
    await CreditTransaction.create({
      faculty: facultyId,
      type: "earned",
      amount: 1,
      description: `Earned 1 credit for accepting substitution`,
      substitution: substitution._id,
      balanceAfter: substitutingFaculty.credits,
    });

    // Update requesting faculty's stats
    const requestingFaculty = await User.findById(
      substitution.requestingFaculty,
    );
    requestingFaculty.totalSubstitutionsGiven += 1;
    await requestingFaculty.save();

    res.status(200).json({
      success: true,
      message: "Substitution accepted successfully. You earned 1 credit!",
      data: substitution,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error accepting substitution",
      error: error.message,
    });
  }
};

// Decline a substitution request
export const declineSubstitution = async (req, res) => {
  try {
    const { substitutionId } = req.params;
    const facultyId = req.user._id;

    const substitution = await Substitution.findById(substitutionId);

    if (!substitution) {
      return res.status(404).json({
        success: false,
        message: "Substitution not found",
      });
    }

    // Check if faculty was notified
    const notificationIndex = substitution.notifiedFaculties.findIndex(
      (nf) => nf.faculty.toString() === facultyId.toString(),
    );

    if (notificationIndex === -1) {
      return res.status(403).json({
        success: false,
        message: "You were not notified about this substitution",
      });
    }

    // Update notification status
    substitution.notifiedFaculties[notificationIndex].responded = true;
    substitution.notifiedFaculties[notificationIndex].response = "declined";
    substitution.notifiedFaculties[notificationIndex].respondedAt = new Date();
    await substitution.save();

    res.status(200).json({
      success: true,
      message: "Substitution declined",
      data: substitution,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error declining substitution",
      error: error.message,
    });
  }
};

// Mark substitution as completed
export const completeSubstitution = async (req, res) => {
  try {
    const { substitutionId } = req.params;

    const substitution = await Substitution.findById(substitutionId);

    if (!substitution) {
      return res.status(404).json({
        success: false,
        message: "Substitution not found",
      });
    }

    // Only requesting faculty or substituting faculty can mark as complete
    if (
      substitution.requestingFaculty.toString() !== req.user._id.toString() &&
      substitution.substitutingFaculty?.toString() !==
        req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (substitution.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Only accepted substitutions can be marked as completed",
      });
    }

    substitution.status = "completed";
    await substitution.save();

    res.status(200).json({
      success: true,
      message: "Substitution marked as completed",
      data: substitution,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error completing substitution",
      error: error.message,
    });
  }
};

// Cancel substitution request
export const cancelSubstitution = async (req, res) => {
  try {
    const { substitutionId } = req.params;

    const substitution = await Substitution.findById(substitutionId);

    if (!substitution) {
      return res.status(404).json({
        success: false,
        message: "Substitution not found",
      });
    }

    // Only requesting faculty or admin can cancel
    if (
      substitution.requestingFaculty.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Only requesting faculty can cancel",
      });
    }

    if (substitution.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel completed substitution",
      });
    }

    // If credits were used and already assigned, refund them
    if (substitution.creditsUsed > 0 && substitution.substitutingFaculty) {
      const requestingFaculty = await User.findById(
        substitution.requestingFaculty,
      );
      requestingFaculty.credits += substitution.creditsUsed;
      await requestingFaculty.save();

      // Create refund transaction
      await CreditTransaction.create({
        faculty: substitution.requestingFaculty,
        type: "bonus",
        amount: substitution.creditsUsed,
        description: `Refunded ${substitution.creditsUsed} credits for cancelled substitution`,
        substitution: substitution._id,
        balanceAfter: requestingFaculty.credits,
      });

      // Deduct credits from substituting faculty (if they earned any)
      const substitutingFaculty = await User.findById(
        substitution.substitutingFaculty,
      );
      if (substitutingFaculty.credits > 0) {
        substitutingFaculty.credits -= 1;
        await substitutingFaculty.save();

        await CreditTransaction.create({
          faculty: substitution.substitutingFaculty,
          type: "penalty",
          amount: 1,
          description: "Deducted 1 credit for cancelled substitution",
          substitution: substitution._id,
          balanceAfter: substitutingFaculty.credits,
        });
      }
    }

    substitution.status = "cancelled";
    await substitution.save();

    res.status(200).json({
      success: true,
      message: "Substitution cancelled successfully",
      data: substitution,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling substitution",
      error: error.message,
    });
  }
};

// Get all substitutions (admin only)
export const getAllSubstitutions = async (req, res) => {
  try {
    const { status, department, page = 1, limit = 20 } = req.query;

    // Only admin can view all
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    const query = {};
    if (status) query.status = status;
    if (department) query.department = department;

    const substitutions = await Substitution.find(query)
      .populate("requestingFaculty", "name email department")
      .populate("substitutingFaculty", "name email department")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Substitution.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: substitutions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching substitutions",
      error: error.message,
    });
  }
};

// Get substitution statistics
export const getSubstitutionStats = async (req, res) => {
  try {
    const { facultyId } = req.query;
    const query = {};

    // If facultyId provided, filter by that faculty
    if (facultyId) {
      query.$or = [
        { requestingFaculty: facultyId },
        { substitutingFaculty: facultyId },
      ];
    }

    const stats = await Substitution.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalSubstitutions = await Substitution.countDocuments(query);
    const completedSubstitutions = await Substitution.countDocuments({
      ...query,
      status: "completed",
    });

    // Get this month's stats
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyStats = await Substitution.aggregate([
      {
        $match: {
          ...query,
          createdAt: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalSubstitutions,
        completed: completedSubstitutions,
        completionRate:
          totalSubstitutions > 0
            ? ((completedSubstitutions / totalSubstitutions) * 100).toFixed(2) +
              "%"
            : "0%",
        byStatus: stats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        thisMonth: monthlyStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

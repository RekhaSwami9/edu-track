import Leave from "../models/Leave.model.js";
import User from "../models/User.model.js";

// Apply for leave
export const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const facultyId = req.user._id;

    // Validate required fields
    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: leaveType, startDate, endDate, reason",
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Create leave request
    const leave = await Leave.create({
      faculty: facultyId,
      leaveType,
      startDate: start,
      endDate: end,
      reason,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Leave application submitted successfully",
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error applying for leave",
      error: error.message,
    });
  }
};

// Get my leaves
export const getMyLeaves = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const facultyId = req.user._id;

    const query = { faculty: facultyId };
    if (status) query.status = status;

    const leaves = await Leave.find(query)
      .populate("approvedBy", "name email")
      .populate("substitutions", "status subject date")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Leave.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching leaves",
      error: error.message,
    });
  }
};

// Get all leaves (admin only)
export const getAllLeaves = async (req, res) => {
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

    // If department filter provided, we need to populate faculty and filter
    let leavesQuery = Leave.find(query)
      .populate("faculty", "name email department")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 });

    if (department) {
      leavesQuery = leavesQuery.populate({
        path: "faculty",
        match: { department },
        select: "name email department",
      });
    }

    const leaves = await leavesQuery.limit(limit * 1).skip((page - 1) * limit);

    const count = await Leave.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching all leaves",
      error: error.message,
    });
  }
};

// Update leave status (approve/reject)
export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;
    const adminId = req.user._id;

    // Only admin can update status
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'approved' or 'rejected'",
      });
    }

    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Cannot update leave with status: ${leave.status}`,
      });
    }

    leave.status = status;
    leave.approvedBy = adminId;
    leave.approvedAt = new Date();
    await leave.save();

    res.status(200).json({
      success: true,
      message: `Leave ${status} successfully`,
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating leave status",
      error: error.message,
    });
  }
};

// Cancel leave
export const cancelLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const facultyId = req.user._id;

    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    // Only the faculty who applied or admin can cancel
    if (
      leave.faculty.toString() !== facultyId.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this leave",
      });
    }

    if (leave.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Leave is already cancelled",
      });
    }

    leave.status = "cancelled";
    await leave.save();

    res.status(200).json({
      success: true,
      message: "Leave cancelled successfully",
      data: leave,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling leave",
      error: error.message,
    });
  }
};

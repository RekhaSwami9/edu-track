import CreditTransaction from "../models/CreditTransaction.model.js";
import User from "../models/User.model.js";

// Get faculty's current credit balance
export const getCreditBalance = async (req, res) => {
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
        message: "You can only view your own credit balance",
      });
    }

    const user = await User.findById(targetFacultyId).select("credits name");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        facultyId: user._id,
        name: user.name,
        credits: user.credits,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching credit balance",
      error: error.message,
    });
  }
};

// Get credit transaction history
export const getTransactionHistory = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { page = 1, limit = 20, type } = req.query;

    const targetFacultyId = facultyId === "me" ? req.user._id : facultyId;

    // Check permissions
    if (
      targetFacultyId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own transaction history",
      });
    }

    // Build query
    const query = { faculty: targetFacultyId };
    if (type && ["earned", "used", "bonus", "penalty"].includes(type)) {
      query.type = type;
    }

    const transactions = await CreditTransaction.find(query)
      .populate("substitution", "subject date status")
      .populate("leaveRequest", "startDate endDate status")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await CreditTransaction.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching transaction history",
      error: error.message,
    });
  }
};

// Get credit statistics
export const getCreditStats = async (req, res) => {
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

    // Get current month start date
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Aggregate statistics
    const stats = await CreditTransaction.aggregate([
      { $match: { faculty: targetFacultyId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Get this month's stats
    const monthlyStats = await CreditTransaction.aggregate([
      {
        $match: {
          faculty: targetFacultyId,
          createdAt: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const user = await User.findById(targetFacultyId).select(
      "credits totalSubstitutionsTaken totalSubstitutionsGiven",
    );

    res.status(200).json({
      success: true,
      data: {
        currentBalance: user.credits,
        totalSubstitutionsTaken: user.totalSubstitutionsTaken,
        totalSubstitutionsGiven: user.totalSubstitutionsGiven,
        lifetimeStats: stats.reduce((acc, curr) => {
          acc[curr._id] = { total: curr.total, count: curr.count };
          return acc;
        }, {}),
        thisMonthStats: monthlyStats.reduce((acc, curr) => {
          acc[curr._id] = { total: curr.total, count: curr.count };
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching credit statistics",
      error: error.message,
    });
  }
};

// Admin: Add bonus credits
export const addBonusCredits = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { amount, description } = req.body;

    // Only admin can add bonus credits
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can add bonus credits",
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const user = await User.findById(facultyId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user credits
    const previousBalance = user.credits;
    user.credits += amount;
    await user.save();

    // Create transaction record
    const transaction = await CreditTransaction.create({
      faculty: facultyId,
      type: "bonus",
      amount: amount,
      description: description || "Bonus credits added by admin",
      balanceAfter: user.credits,
    });

    res.status(200).json({
      success: true,
      message: `${amount} bonus credits added successfully`,
      data: {
        previousBalance,
        newBalance: user.credits,
        transaction,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding bonus credits",
      error: error.message,
    });
  }
};

// Admin: Deduct credits (penalty)
export const deductCredits = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { amount, description } = req.body;

    // Only admin can deduct credits
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can deduct credits",
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const user = await User.findById(facultyId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.credits < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient credits to deduct",
      });
    }

    // Update user credits
    const previousBalance = user.credits;
    user.credits -= amount;
    await user.save();

    // Create transaction record
    const transaction = await CreditTransaction.create({
      faculty: facultyId,
      type: "penalty",
      amount: amount,
      description: description || "Credits deducted by admin",
      balanceAfter: user.credits,
    });

    res.status(200).json({
      success: true,
      message: `${amount} credits deducted successfully`,
      data: {
        previousBalance,
        newBalance: user.credits,
        transaction,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deducting credits",
      error: error.message,
    });
  }
};

// Get leaderboard (faculties with most credits)
export const getLeaderboard = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const faculties = await User.find({ role: "faculty" })
      .select(
        "name department credits totalSubstitutionsTaken totalSubstitutionsGiven",
      )
      .sort({ credits: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: faculties.length,
      data: faculties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching leaderboard",
      error: error.message,
    });
  }
};

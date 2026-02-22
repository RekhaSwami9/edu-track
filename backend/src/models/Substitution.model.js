import mongoose from "mongoose";

const substitutionSchema = new mongoose.Schema(
  {
    // Faculty who needs substitution (on leave)
    requestingFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Faculty who accepts the substitution
    substitutingFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // Class/Subject details
    subject: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    // Date and time of the class
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    endTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    // Status of the substitution
    status: {
      type: String,
      enum: [
        "pending", // Waiting for someone to accept
        "notified", // Notified to available faculties
        "accepted", // Someone accepted
        "completed", // Class completed successfully
        "declined", // All declined or request cancelled
        "cancelled", // Requesting faculty cancelled
      ],
      default: "pending",
    },
    // How was this substitution assigned
    assignmentType: {
      type: String,
      enum: ["credit_based", "volunteer", "manual", "auto_assign"],
      default: "volunteer",
    },
    // Credits involved
    creditsEarned: {
      type: Number,
      default: 1, // Default 1 credit per substitution
    },
    // If credits were used to auto-assign
    creditsUsed: {
      type: Number,
      default: 0,
    },
    // List of faculties who were notified
    notifiedFaculties: [
      {
        faculty: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        notifiedAt: {
          type: Date,
          default: Date.now,
        },
        responded: {
          type: Boolean,
          default: false,
        },
        response: {
          type: String,
          enum: ["accepted", "declined", null],
          default: null,
        },
        respondedAt: {
          type: Date,
          default: null,
        },
      },
    ],
    // Notes/Comments
    notes: {
      type: String,
      default: "",
    },
    // Related leave request (if substitution is for a leave)
    relatedLeave: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for faster queries
substitutionSchema.index({ requestingFaculty: 1, status: 1 });
substitutionSchema.index({ substitutingFaculty: 1, status: 1 });
substitutionSchema.index({ date: 1, status: 1 });
substitutionSchema.index({ department: 1, status: 1 });

export default mongoose.model("Substitution", substitutionSchema);

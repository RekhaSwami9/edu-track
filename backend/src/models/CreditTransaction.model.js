import mongoose from "mongoose";

const creditTransactionSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["earned", "used", "bonus", "penalty"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    // Description of the transaction
    description: {
      type: String,
      default: "",
    },
    // Related substitution (if applicable)
    substitution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Substitution",
      default: null,
    },
    // Related leave request (if credits were used for leave)
    leaveRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
      default: null,
    },
    // Running balance after this transaction
    balanceAfter: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
creditTransactionSchema.index({ faculty: 1, createdAt: -1 });
creditTransactionSchema.index({ type: 1 });

export default mongoose.model("CreditTransaction", creditTransactionSchema);

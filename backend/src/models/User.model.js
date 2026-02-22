import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["admin", "faculty"],
      default: "faculty",
    },
    department: {
      type: String,
      default: "",
    },
    subjects: [
      {
        type: String,
      },
    ],
    credits: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalSubstitutionsTaken: {
      type: Number,
      default: 0,
    },
    totalSubstitutionsGiven: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);

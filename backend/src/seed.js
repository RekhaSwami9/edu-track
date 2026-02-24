import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.model.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    // Check if test user already exists
    const existingUser = await User.findOne({ email: "test@school.edu" });
    if (existingUser) {
      console.log("Test user already exists");
      console.log("Email: test@school.edu");
      console.log("Password: password");
      process.exit(0);
    }

    // Create test user
    const hashedPassword = await bcrypt.hash("password", 10);

    const testUser = await User.create({
      name: "Test Teacher",
      email: "test@school.edu",
      password: hashedPassword,
      role: "faculty",
      department: "Mathematics",
      phone: "+1 (555) 123-4567",
      designation: "Senior Teacher",
      specialization: "Algebra, Calculus",
      joiningDate: new Date("2020-08-15"),
      credits: 100,
    });

    console.log("✅ Test user created successfully!");
    console.log("Email: test@school.edu");
    console.log("Password: password");
    console.log("Role: faculty");
    console.log("Department: Mathematics");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();

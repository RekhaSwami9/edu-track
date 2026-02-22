import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import substitutionRoutes from "./routes/substitution.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import creditRoutes from "./routes/credit.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/substitution", substitutionRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/credits", creditRoutes);

app.get("/", (req, res) => {
  res.send("Edu Track API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

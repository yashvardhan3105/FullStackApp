import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import questRoutes from "./routes/quests.js";

dotenv.config();
const app = express();

console.log("Backend JWT Secret:", process.env.JWT_SECRET);
console.log("MongoDB URI:", process.env.MONGO_URI); // DEBUG

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB Connected!"))
  .catch((err) => console.log("this is the error: " + err));

app.use("/api/auth", authRoutes);
app.use("/api/quests", questRoutes); // ✅ Register Quest Routes

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { updateLevelAndRank } from "../utils/levelSystem.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 Get logged-in user details
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔥 Signup Route
router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { username, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        username,
        email,
        password: hashedPassword,
        level: 1,
        rank: "E",
        xp: 0,
        strength: 1,
        agility: 1,
        endurance: 1,
        intelligence: 1,
        willpower: 1,
        perception: 1,
        charisma: 1,
        titles: [],
        quests: [],
        bossBattles: [],
      });

      updateLevelAndRank(user);
      await user.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error.stack);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// 🔥 Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      message: "Logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        level: user.level,
        rank: user.rank,
        xp: user.xp,
        strength: user.strength,
        agility: user.agility,
        endurance: user.endurance,
        intelligence: user.intelligence,
        willpower: user.willpower,
        perception: user.perception,
        charisma: user.charisma,
        titles: user.titles,
        quests: user.quests,
        bossBattles: user.bossBattles,
      },
    });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔥 Update Stats Route
router.put(
  "/update-stats",
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("stats").isObject().withMessage("Stats must be an object"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { userId, stats } = req.body;
      let user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      Object.assign(user, stats);

      updateLevelAndRank(user);
      await user.save();

      res.status(200).json({ message: "Stats updated successfully", user });
    } catch (error) {
      console.error(error.stack);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

export default router;

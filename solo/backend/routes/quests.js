import express from "express";
import { body, validationResult } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Add a New Custom Quest
router.post(
  "/add",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("rewardStats")
      .isObject()
      .withMessage("Reward stats must be an object"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { title, description, rewardStats } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // ✅ Add the new quest
      user.customQuests.push({
        title,
        description,
        rewardStats,
        completed: false,
      });

      await user.save();
      res.status(201).json({ message: "Quest added successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ✅ Mark Quest as Completed & Auto-Delete
router.put("/complete/:questId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const quest = user.customQuests.id(req.params.questId);
    if (!quest) return res.status(404).json({ message: "Quest not found" });

    if (quest.completed)
      return res.status(400).json({ message: "Quest already completed" });

    // ✅ Apply stat rewards
    Object.keys(quest.rewardStats).forEach((stat) => {
      user[stat] = (user[stat] || 0) + quest.rewardStats[stat];
    });

    // ✅ Mark quest as completed
    quest.completed = true;
    await user.save();

    // ⏳ Wait 5 seconds, then auto-delete completed quests
    setTimeout(async () => {
      try {
        const updatedUser = await User.findById(req.user.id);
        updatedUser.customQuests = updatedUser.customQuests.filter(
          (q) => !q.completed // ✅ Remove all completed quests
        );
        await updatedUser.save();
        console.log("✅ Auto-deleted completed quests.");
      } catch (err) {
        console.error("🔥 Error deleting completed quests:", err.message);
      }
    }, 2000);

    res.status(200).json({ message: "Quest completed successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Manual Cleanup Route (Optional: Trigger this anytime)
router.delete("/cleanup", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.customQuests = user.customQuests.filter((quest) => !quest.completed);
    await user.save();

    res.status(200).json({ message: "Cleaned up completed quests", user });
  } catch (error) {
    console.error("🔥 Cleanup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;

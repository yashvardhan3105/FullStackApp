import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: Number, default: 1 },
  rank: { type: String, default: "E" },
  xp: { type: Number, default: 0 },
  strength: { type: Number, default: 1 },
  agility: { type: Number, default: 1 },
  endurance: { type: Number, default: 1 },
  intelligence: { type: Number, default: 1 },
  willpower: { type: Number, default: 1 },
  perception: { type: Number, default: 1 },
  charisma: { type: Number, default: 1 },
  titles: [{ type: String }],
  quests: [{ type: String }],
  bossBattles: [{ type: String }],

  // ✅ Custom Quests (NEW)
  customQuests: [
    {
      title: { type: String, required: true },
      description: { type: String },
      rewardStats: {
        strength: { type: Number, default: 0 },
        agility: { type: Number, default: 0 },
        endurance: { type: Number, default: 0 },
        intelligence: { type: Number, default: 0 },
        willpower: { type: Number, default: 0 },
        perception: { type: Number, default: 0 },
        charisma: { type: Number, default: 0 },
      },
      completed: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model("User", UserSchema);

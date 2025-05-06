export const handleXPandLevelUp = (user) => {
  // 🎲 Random XP between 2-10
  const randomXP = Math.floor(Math.random() * 9) + 2;
  user.xp += randomXP;

  // ✅ Level Up Check
  if (user.xp >= 100) {
    user.xp = 0; // Reset XP
    user.level += 1; // Level Up

    // ✅ Boost ALL stats by +2
    user.stats.strength += 2;
    user.stats.agility += 2;
    user.stats.endurance += 2;
    user.stats.intelligence += 2;
    user.stats.willpower += 2;
    user.stats.perception += 2;
    user.stats.charisma += 2;

    console.log(`🔥 LEVEL UP! ${user.username} is now Level ${user.level}`);
  }

  return user;
};

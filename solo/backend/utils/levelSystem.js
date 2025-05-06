export const updateLevelAndRank = (user) => {
  const allStats = [
    user.strength,
    user.agility,
    user.endurance,
    user.intelligence,
    user.willpower,
    user.perception,
    user.charisma,
  ];

  if (user.level >= 100) user.rank = "S";
  else if (user.level >= 80) user.rank = "A";
  else if (user.level >= 60) user.rank = "B";
  else if (user.level >= 40) user.rank = "C";
  else if (user.level >= 20) user.rank = "D";
  else user.rank = "E";

  return user;
};

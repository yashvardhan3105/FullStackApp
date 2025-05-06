import React from "react";

const RankCard = ({ rank, level, title }) => {
  const rankColors = {
    E: "bg-gray-600",
    D: "bg-blue-400",
    C: "bg-blue-600",
    B: "bg-purple-500",
    A: "bg-purple-700",
    S: "bg-red-600",
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg text-center ${rankColors[rank]}`}>
      <h3 className="text-xl font-bold text-white">Rank: {rank}</h3>
      <p className="text-lg text-white">Level: {level}</p>
      {title && <p className="text-sm italic text-gray-200">"{title}"</p>}
    </div>
  );
};

export default RankCard;

import React from "react";

const XPProgress = ({ xp, maxXp }) => {
  const percentage = (xp / maxXp) * 100;
  const barColor =
    percentage < 30
      ? "bg-red-500"
      : percentage < 70
      ? "bg-yellow-500"
      : "bg-blue-500";

  return (
    <div className="w-full max-w-md px-4 py-2 text-center bg-gray-900 rounded-lg shadow-md">
      <p className="mb-1 text-sm font-semibold tracking-wide text-gray-300">
        XP: {xp} / {maxXp}
      </p>
      <div className="w-full h-5 bg-gray-700 rounded-full shadow-inner">
        <div
          className={`h-full transition-all duration-300 rounded-full ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default XPProgress;

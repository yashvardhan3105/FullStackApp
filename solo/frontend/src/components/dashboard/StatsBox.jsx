import React from "react";

const StatsBox = ({ statName, value }) => {
  return (
    <div className="p-3 text-center bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-gray-300">{statName}</h3>
      <p className="text-xl font-semibold text-blue-400">{value}</p>
    </div>
  );
};

export default StatsBox;

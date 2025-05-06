import React from "react";

const AuthInput = ({ label, type, value, setValue, placeholder }) => {
  return (
    <div className="w-full">
      <label className="block mb-1 text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default AuthInput;

import React, { useState } from "react";
import AuthInput from "./AuthInput";

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSignup({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthInput
        label="Username"
        type="text"
        value={username}
        setValue={setUsername}
        placeholder="Choose a username"
      />
      <AuthInput
        label="Email"
        type="email"
        value={email}
        setValue={setEmail}
        placeholder="Enter your email"
      />
      <AuthInput
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
        placeholder="Create a password"
      />
      <button
        type="submit"
        className="w-full p-2 bg-green-500 rounded-lg hover:bg-green-600"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;

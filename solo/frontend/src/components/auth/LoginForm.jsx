import React, { useState } from "react";
import AuthInput from "./AuthInput";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Enter password"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

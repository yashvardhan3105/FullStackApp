import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import gsap from "gsap";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      // 🔥 Call API for login
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        console.log("Login successful:", data);
        console.log("User data:", data.user);
        console.log("User ID:", data.user.id);
        console.log("User Rank:", data.user.rank);
        console.log("User XP:", data.user.xp);
        console.log("User Strength:", data.user.strength);
        console.log("User Agility:", data.user.agility);
        console.log("User Endurance:", data.user.endurance);
        console.log("User Intelligence:", data.user.intelligence);
        console.log("User Willpower:", data.user.willpower);
        console.log("User Perception:", data.user.perception);
        console.log("User Charisma:", data.user.charisma);
        console.log("User Titles:", data.user.titles);
        console.log("User Quests:", data.user.quests);
        console.log("User Boss Battles:", data.user.bossBattles);

        // 🔥 BLUE FLAME TRANSITION 🔥
        gsap.to(".login-container", {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          onComplete: () => {
            navigate("/dashboard");
          },
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black login-container">
      <div className="p-8 text-white bg-gray-900 rounded-lg shadow-lg w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;

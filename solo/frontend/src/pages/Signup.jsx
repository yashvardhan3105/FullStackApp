import React from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import gsap from "gsap";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);

        // 🔥 BLUE FLAME TRANSITION 🔥
        gsap.to(".signup-container", {
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
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black signup-container">
      <div className="p-8 text-white bg-gray-900 rounded-lg shadow-lg w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        <SignupForm onSignup={handleSignup} />
      </div>
    </div>
  );
};

export default Signup;

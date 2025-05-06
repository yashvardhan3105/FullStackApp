import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RankCard from "../components/dashboard/RankCard";
import StatsBox from "../components/dashboard/StatsBox";
import XPProgress from "../components/dashboard/XPProgress";
import QuestList from "../components/dashboard/QuestList";
import CustomQuestForm from "../components/CustomQuestForm.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Redirecting...");
        navigate("/");
        return;
      }

      try {
        console.log("🔄 Fetching user data...");
        const res = await fetch("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("❌ Fetch failed, Status:", res.status);
          throw new Error("Invalid response from server");
        }

        const data = await res.json();
        console.log("✅ User data fetched:", data);
        setUser(data);
      } catch (error) {
        console.error("❌ Error fetching user:", error.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:5000/api/auth/user", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await response.json();
    if (response.ok) setUser(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!user) return <p className="text-white">Error loading user data.</p>;
  return (
    <div className="min-h-screen px-6 py-8 text-white bg-black">
      {/* Header */}
      <h1 className="mb-6 text-4xl font-extrabold tracking-wide text-center text-blue-400 uppercase">
        Welcome, {user.username}!
      </h1>
      {/* Rank & XP */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        <RankCard rank={user.rank} level={user.level} title={user.title} />
        <XPProgress xp={user.xp} maxXp={100} />
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-4">
        {[
          "Strength",
          "Agility",
          "Endurance",
          "Intelligence",
          "Willpower",
          "Perception",
          "Charisma",
        ].map((stat) => (
          <StatsBox
            key={stat}
            statName={stat}
            value={user[stat.toLowerCase()]}
          />
        ))}
      </div>
      {/* Quests */}
      <h2 className="mt-10 text-3xl font-semibold tracking-wide text-center text-purple-400">
        Active Quests
      </h2>
      <QuestList quests={user.customQuests} fetchUserData={fetchUserData} />
    </div>
  );
};

export default Dashboard;

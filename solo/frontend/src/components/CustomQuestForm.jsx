import React, { useState } from "react";

const CustomQuestForm = ({ fetchUserData, setShowForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rewardStats, setRewardStats] = useState({ strength: 0, agility: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Submitting quest:", { title, description, rewardStats });

    try {
      const response = await fetch("http://localhost:5000/api/quests/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description, rewardStats }),
      });

      const data = await response.json();
      console.log("🛠 Server response:", data);

      if (response.ok) {
        console.log("✅ Quest added successfully");

        // ❌ Don't mutate state directly - use callback function
        fetchUserData((prevData) => {
          console.log("🔄 Updating frontend state...", prevData);
          return {
            ...prevData,
            customQuests: [...prevData.customQuests, data.newQuest], // ✅ Add only the new quest
          };
        });

        setShowForm(false); // ✅ Close form
      } else {
        console.error("❌ Error adding quest:", data.message);
      }
    } catch (error) {
      console.error("❌ Fetch failed:", error);
    }
  };

  return (
    <div className="p-4 mt-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="mb-2 text-xl font-bold text-white">Create Custom Quest</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Quest Title"
          className="w-full p-2 text-white bg-gray-700 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Quest Description"
          className="w-full p-2 text-white bg-gray-700 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Strength Reward"
            className="w-1/2 p-2 text-white bg-gray-700 rounded"
            value={rewardStats.strength}
            onChange={(e) =>
              setRewardStats({
                ...rewardStats,
                strength: parseInt(e.target.value) || 0,
              })
            }
          />
          <input
            placeholder="Agility Reward"
            type="number"
            className="w-1/2 p-2 text-white bg-gray-700 rounded"
            value={rewardStats.agility}
            onChange={(e) =>
              setRewardStats({
                ...rewardStats,
                agility: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
        >
          Add Quest
        </button>
      </form>
    </div>
  );
};

export default CustomQuestForm;

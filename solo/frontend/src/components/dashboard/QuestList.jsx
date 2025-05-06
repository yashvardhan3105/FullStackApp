import React, { useState, useEffect } from "react";
import CustomQuestForm from "../CustomQuestForm.jsx";

const QuestList = ({ quests, fetchUserData }) => {
  const [showForm, setShowForm] = useState(false);
  const [localQuests, setLocalQuests] = useState(quests);

  // Sync local state when `quests` prop changes
  useEffect(() => {
    setLocalQuests(quests);
  }, [quests]);

  // ✅ Handle quest completion & deletion
  const handleCompleteQuest = async (questId) => {
    const response = await fetch(
      `http://localhost:5000/api/quests/complete/${questId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      // ✅ Instantly mark as completed in UI
      setLocalQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest._id === questId ? { ...quest, completed: true } : quest
        )
      );

      // ⏳ Wait 5s then DELETE it from UI & MongoDB
      setTimeout(async () => {
        const deleteResponse = await fetch(
          `http://localhost:5000/api/quests/cleanup`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (deleteResponse.ok) {
          // ✅ Remove from UI after deletion
          setLocalQuests((prevQuests) =>
            prevQuests.filter((quest) => quest._id !== questId)
          );
        } else {
          console.error("Error deleting quest");
        }
      }, 1000);
    } else {
      console.error("Error marking quest as completed");
    }
  };

  return (
    <div className="p-4 text-white bg-gray-900 rounded-lg">
      <h2 className="mb-3 text-xl font-bold">Your Custom Quests</h2>

      {localQuests.length > 0 ? (
        localQuests.map((quest) => (
          <div
            key={quest._id}
            className={`p-3 mb-2 bg-gray-800 rounded transition-opacity duration-1000 ${
              quest.completed ? "opacity-50" : "opacity-100"
            }`}
          >
            <strong>{quest.title}</strong> - {quest.description}
            <p
              className={`text-sm ${
                quest.completed ? "text-green-400" : "text-red-400"
              }`}
            >
              {quest.completed
                ? "Completed ✅ (Deleting in 2s...)"
                : "Incomplete ❌"}
            </p>
            {/* ✅ Complete Quest Button */}
            {!quest.completed && (
              <button
                onClick={() => handleCompleteQuest(quest._id)}
                className="px-3 py-1 mt-2 text-sm font-bold text-white bg-green-600 rounded hover:bg-green-700"
              >
                Complete Quest
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No quests added yet.</p>
      )}

      {/* ✅ Add Quest Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full p-2 mt-4 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {showForm ? "Close" : "Add Custom Quest"}
      </button>

      {/* ✅ Show Form if Button is Clicked */}
      {showForm && (
        <CustomQuestForm
          fetchUserData={fetchUserData}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default QuestList;

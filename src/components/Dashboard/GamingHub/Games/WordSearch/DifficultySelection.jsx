// DifficultySelection.jsx
import React, { useState } from "react";

const DifficultySelection = ({ onSelectDifficulty }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleSelectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    onSelectDifficulty(difficulty);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Select Difficulty:</h2>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleSelectDifficulty("easy")}
          className="px-4 py-2 bg-theme text-white rounded-md hover:bg-opacity-75"
        >
          Easy
        </button>
        <button
          onClick={() => handleSelectDifficulty("medium")}
          className="px-4 py-2 bg-green text-white rounded-md hover:bg-opacity-75"
        >
          Medium
        </button>
        <button
          onClick={() => handleSelectDifficulty("hard")}
          className="px-4 py-2 bg-red text-white rounded-md hover:bg-opacity-75"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default DifficultySelection;

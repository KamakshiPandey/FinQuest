// MainComponent.jsx
import React, { useState } from "react";
import WordSearch from "./WordSearch";
import DifficultySelection from "./DifficultySelection";

const WordSearchMain = () => {
  const [difficulty, setDifficulty] = useState("");

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  return (
    <div>
      {difficulty ? (
        <WordSearch difficulty={difficulty} />
      ) : (
        <DifficultySelection onSelectDifficulty={handleSelectDifficulty} />
      )}
    </div>
  );
};

export default WordSearchMain;

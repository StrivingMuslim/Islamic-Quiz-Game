import React from 'react';
import { QUESTION_CATEGORIES, DIFFICULTY_LEVELS } from '../data';

const MenuScreen = ({ playerName, setPlayerName, level, xp, selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, startGame }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-900 rounded-lg shadow-2xl animate-fade-in-down">
    <h1 className="mb-4 text-4xl font-extrabold text-white">Islamic Quiz Game</h1>
    <p className="mb-6 text-sm text-gray-400">Level: {level} | XP: {xp}</p>
    <div className="w-full max-w-sm mb-6">
      <input
        type="text"
        placeholder="Enter your name"
        className="w-full p-3 text-lg text-white bg-gray-800 border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
    </div>

    <div className="flex flex-col w-full max-w-sm mb-6">
      <h2 className="mb-2 text-xl font-bold text-gray-200">Select Category:</h2>
      <div className="grid grid-cols-2 gap-2">
        {QUESTION_CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 ${selectedCategory === category.id ? category.color : 'bg-gray-700 hover:bg-gray-600'} shadow-md`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>
    </div>

    <div className="flex flex-col w-full max-w-sm mb-8">
      <h2 className="mb-2 text-xl font-bold text-gray-200">Select Difficulty:</h2>
      <div className="grid grid-cols-3 gap-2">
        {DIFFICULTY_LEVELS.map(difficulty => (
          <button
            key={difficulty.id}
            onClick={() => setSelectedDifficulty(difficulty.id)}
            className={`p-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 ${selectedDifficulty === difficulty.id ? difficulty.color : 'bg-gray-700 hover:bg-gray-600'} shadow-md`}
          >
            {difficulty.name}
          </button>
        ))}
      </div>
    </div>

    <button
      onClick={startGame}
      disabled={!playerName || !selectedCategory || !selectedDifficulty}
      className={`w-full max-w-sm p-4 text-xl font-extrabold text-white transition-all duration-300 transform rounded-lg hover:scale-105 ${!playerName || !selectedCategory || !selectedDifficulty ? 'bg-gray-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 shadow-xl'}`}
    >
      Start Quiz Challenge!
    </button>
  </div>
);

export default MenuScreen;
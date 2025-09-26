import React from 'react';

const GameOverScreen = ({ score, selectedDifficulty, selectedCategory, maxStreak, resetGame, setGameState }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-900 rounded-lg shadow-2xl animate-fade-in-down">
    <h1 className="mb-4 text-4xl font-extrabold text-white">Game Over!</h1>
    <p className="mb-6 text-xl font-semibold text-emerald-500">Your final score is: {score}</p>
    <div className="w-full max-w-sm p-4 mb-8 text-white bg-gray-800 rounded-lg shadow-lg">
      <h2 className="mb-2 text-2xl font-bold text-center">Summary</h2>
      <div className="text-left space-y-2">
        <p className="flex justify-between">
          <span className="text-gray-400">Category:</span>
          <span className="font-semibold">{selectedCategory}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Difficulty:</span>
          <span className="font-semibold">{selectedDifficulty}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-gray-400">Max Streak:</span>
          <span className="font-semibold">{maxStreak}</span>
        </p>
      </div>
    </div>
    <div className="flex flex-col w-full max-w-sm space-y-4">
      <button
        onClick={resetGame}
        className="w-full p-4 text-xl font-extrabold text-white transition-all duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-500 hover:scale-105 shadow-xl"
      >
        Play Again
      </button>
      <button
        onClick={() => setGameState('scoreboard')}
        className="w-full p-4 text-xl font-extrabold text-white transition-all duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-600 hover:scale-105 shadow-xl"
      >
        View Scoreboard
      </button>
    </div>
  </div>
);

export default GameOverScreen;
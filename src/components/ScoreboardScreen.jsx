import React, { useState } from 'react';
import { ACHIEVEMENTS } from '../data';

const ScoreboardScreen = ({ playerName, score, level, selectedCategory, selectedDifficulty, achievements, resetGame }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = () => {
    const shareText = `I just scored ${score} points in the Islamic Quiz Game on ${selectedCategory} (${selectedDifficulty})! Can you beat my score?`;
    if (navigator.share) {
      navigator.share({
        title: 'Islamic Quiz Game',
        text: shareText,
        url: 'https://strivingmuslim.github.io/Islamic-Quiz-Game/',
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Score copied to clipboard! Share it with your friends.');
    }
  };

  const unlockedAchievements = ACHIEVEMENTS.filter(achievement => achievements[achievement.id]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-900 rounded-lg shadow-2xl animate-fade-in-down">
      <h1 className="mb-4 text-4xl font-extrabold text-white">Scoreboard</h1>
      <div className="w-full max-w-sm p-6 mb-8 text-white bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Player:</span>
          <span className="font-bold">{playerName}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Score:</span>
          <span className="text-2xl font-extrabold text-emerald-500">{score}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Level:</span>
          <span className="font-bold">{level}</span>
        </div>
      </div>
      
      <div className="w-full max-w-sm mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-200">Achievements</h2>
        <div className="grid grid-cols-2 gap-4">
          {unlockedAchievements.length > 0 ? (
            unlockedAchievements.map(achievement => (
              <div key={achievement.id} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md">
                <span className={`text-4xl ${achievement.color} mb-2`}>{achievement.icon}</span>
                <h3 className="font-bold text-white text-center">{achievement.name}</h3>
                <p className="mt-1 text-xs text-gray-400 text-center">{achievement.description}</p>
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-400">No achievements unlocked yet.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full max-w-sm space-y-4">
        <button
          onClick={handleShare}
          className="w-full p-4 text-xl font-extrabold text-white transition-all duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 hover:scale-105 shadow-xl"
        >
          Share Score
        </button>
        <button
          onClick={resetGame}
          className="w-full p-4 text-xl font-extrabold text-white transition-all duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-500 hover:scale-105 shadow-xl"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ScoreboardScreen;
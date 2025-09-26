import React, { useState, useEffect } from 'react';

const QuestionScreen = ({ currentQuestion, currentQuestionIndex, questions, timeLeft, selectedAnswer, answerFeedback, handleAnswerSelect, streak, progress }) => {
  const [timerProgress, setTimerProgress] = useState(100);

  useEffect(() => {
    const totalTime = currentQuestion.time || 15;
    const progressPercentage = (timeLeft / totalTime) * 100;
    setTimerProgress(progressPercentage);
  }, [timeLeft, currentQuestion]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-900 rounded-lg shadow-2xl animate-fade-in-down">
      <div className="relative w-full mb-6">
        <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>Streak: {streak} 🔥</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%`, backgroundColor: 'rgb(16, 185, 129)' }}
          ></div>
        </div>
      </div>
      
      <div className="relative w-full max-w-md p-4 text-center text-white bg-gray-800 rounded-lg shadow-lg mb-8">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border-4 border-gray-700 text-xl font-bold">
          <div className="relative w-12 h-12">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-gray-700"
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
                r="20"
                cx="24"
                cy="24"
              />
              <circle
                className="text-emerald-500 transition-all duration-100"
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
                r="20"
                cx="24"
                cy="24"
                style={{ strokeDasharray: 125.66, strokeDashoffset: 125.66 * (100 - timerProgress) / 100 }}
              />
            </svg>
            <span className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{timeLeft}</span>
          </div>
        </div>
        <h2 className="mt-4 mb-4 text-2xl font-semibold">{currentQuestion.question}</h2>
      </div>

      <div className="w-full max-w-sm grid grid-cols-1 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !selectedAnswer && handleAnswerSelect(option)}
            className={`p-4 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 ${
              selectedAnswer && option === currentQuestion.answer
                ? 'bg-green-600 shadow-lg animate-correct-answer'
                : selectedAnswer && option === selectedAnswer && option !== currentQuestion.answer
                ? 'bg-red-600 shadow-lg animate-incorrect-answer'
                : 'bg-gray-700 hover:bg-gray-600 shadow-md'
            } ${selectedAnswer ? 'cursor-not-allowed' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      {answerFeedback && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg text-white w-full max-w-sm animate-fade-in">
          <h3 className="text-xl font-bold mb-2 text-center">{answerFeedback.title}</h3>
          <p className="text-gray-300 text-sm">{answerFeedback.message}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionScreen;
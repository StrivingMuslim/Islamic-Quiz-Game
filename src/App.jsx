import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { QUESTION_CATEGORIES, DIFFICULTY_LEVELS, MOCK_QUESTIONS, ACHIEVEMENTS } from './data';
import MenuScreen from './components/MenuScreen';
import QuestionScreen from './components/QuestionScreen';
import GameOverScreen from './components/GameOverScreen';
import ScoreboardScreen from './components/ScoreboardScreen';

const initialState = {
  playerName: '',
  level: 1,
  xp: 0,
  score: 0,
  questions: [],
  currentQuestionIndex: 0,
  timeLeft: 0,
  selectedAnswer: null,
  answerFeedback: null,
  streak: 0,
  maxStreak: 0,
  gameState: 'menu',
  selectedCategory: QUESTION_CATEGORIES[0].id,
  selectedDifficulty: DIFFICULTY_LEVELS[0].id,
  achievements: {},
  progress: 0,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_DIFFICULTY':
      return { ...state, selectedDifficulty: action.payload };
    case 'START_GAME':
      const questions = MOCK_QUESTIONS[state.selectedCategory][state.selectedDifficulty];
      const initialTime = DIFFICULTY_LEVELS.find(d => d.id === state.selectedDifficulty).time;
      return {
        ...initialState,
        playerName: state.playerName,
        level: state.level,
        xp: state.xp,
        selectedCategory: state.selectedCategory,
        selectedDifficulty: state.selectedDifficulty,
        questions,
        timeLeft: initialTime,
        gameState: 'playing',
      };
    case 'SELECT_ANSWER':
      return { ...state, selectedAnswer: action.payload };
    case 'GIVE_FEEDBACK':
      return { ...state, answerFeedback: action.payload };
    case 'NEXT_QUESTION':
      const nextQuestionIndex = state.currentQuestionIndex + 1;
      const totalQuestions = state.questions.length;
      const nextTime = DIFFICULTY_LEVELS.find(d => d.id === state.selectedDifficulty).time;
      const newProgress = ((nextQuestionIndex + 1) / totalQuestions) * 100;
      return {
        ...state,
        currentQuestionIndex: nextQuestionIndex,
        timeLeft: nextTime,
        selectedAnswer: null,
        answerFeedback: null,
        progress: newProgress,
      };
    case 'END_GAME':
      return {
        ...state,
        gameState: 'gameOver',
        maxStreak: Math.max(state.maxStreak, state.streak),
        achievements: {
          ...state.achievements,
          'first-win': state.score > 0,
          'five-streak': state.maxStreak >= 5,
          'quiz-master': state.selectedDifficulty === 'hard',
          [`${state.selectedCategory}-expert`]: ['medium', 'hard'].includes(state.selectedDifficulty),
        },
      };
    case 'UPDATE_TIMER':
      return { ...state, timeLeft: action.payload };
    case 'UPDATE_SCORE_AND_XP':
      const xpPerQuestion = DIFFICULTY_LEVELS.find(d => d.id === state.selectedDifficulty).xp;
      const newScore = state.score + xpPerQuestion;
      const newXP = state.xp + xpPerQuestion;
      const newLevel = Math.floor(newXP / 100) + 1;
      return {
        ...state,
        score: newScore,
        xp: newXP,
        level: newLevel,
        streak: state.streak + 1,
        maxStreak: Math.max(state.maxStreak, state.streak + 1),
      };
    case 'RESET_STREAK':
      return { ...state, streak: 0 };
    case 'RESET_GAME':
      return { ...initialState, achievements: state.achievements, gameState: 'menu' };
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.payload };
    default:
      return state;
  }
};

const IslamicQuizGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const {
    playerName,
    level,
    xp,
    score,
    questions,
    currentQuestionIndex,
    timeLeft,
    selectedAnswer,
    answerFeedback,
    streak,
    maxStreak,
    gameState,
    selectedCategory,
    selectedDifficulty,
    achievements,
    progress,
  } = state;

  const currentQuestion = questions[currentQuestionIndex];

  // Timer logic
  useEffect(() => {
    if (gameState !== 'playing' || timeLeft === 0 || selectedAnswer) {
      return;
    }

    const timer = setInterval(() => {
      dispatch({ type: 'UPDATE_TIMER', payload: timeLeft - 1 });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState, selectedAnswer]);

  // Handle next question or game over
  useEffect(() => {
    if (selectedAnswer) {
      const timer = setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          dispatch({ type: 'NEXT_QUESTION' });
        } else {
          dispatch({ type: 'END_GAME' });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, currentQuestionIndex, questions.length]);

  const handleAnswerSelect = useCallback((answer) => {
    if (selectedAnswer) return;

    dispatch({ type: 'SELECT_ANSWER', payload: answer });

    const isCorrect = answer === currentQuestion.answer;
    const feedbackTitle = isCorrect ? 'Correct!' : 'Incorrect.';
    const feedbackMessage = currentQuestion.explanation;

    dispatch({ type: 'GIVE_FEEDBACK', payload: { title: feedbackTitle, message: feedbackMessage } });

    if (isCorrect) {
      dispatch({ type: 'UPDATE_SCORE_AND_XP' });
    } else {
      dispatch({ type: 'RESET_STREAK' });
    }
  }, [currentQuestion, selectedAnswer]);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const setGameState = useCallback((state) => {
    dispatch({ type: 'SET_GAME_STATE', payload: state });
  }, []);

  const setPlayerName = useCallback((name) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: name });
  }, []);

  const setSelectedCategory = useCallback((category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }, []);

  const setSelectedDifficulty = useCallback((difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  }, []);

  if (gameState === 'menu') {
    return (
      <MenuScreen
        playerName={playerName}
        setPlayerName={setPlayerName}
        level={level}
        xp={xp}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        startGame={startGame}
      />
    );
  }
  if (gameState === 'playing') {
    return (
      <QuestionScreen
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        questions={questions}
        timeLeft={timeLeft}
        selectedAnswer={selectedAnswer}
        answerFeedback={answerFeedback}
        handleAnswerSelect={handleAnswerSelect}
        streak={streak}
        progress={progress}
      />
    );
  }
  if (gameState === 'gameOver') {
    return (
      <GameOverScreen
        score={score}
        selectedDifficulty={selectedDifficulty}
        selectedCategory={selectedCategory}
        maxStreak={maxStreak}
        resetGame={resetGame}
        setGameState={setGameState}
      />
    );
  }
  if (gameState === 'scoreboard') {
    return (
      <ScoreboardScreen
        playerName={playerName}
        score={score}
        level={level}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        achievements={achievements}
        resetGame={resetGame}
      />
    );
  }

  return null;
};

export default IslamicQuizGame;
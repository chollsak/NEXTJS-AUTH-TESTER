import React, { useState, useEffect, useRef } from 'react';

const words = [
  "programming", "javascript", "react", "nextjs", "typescript", "frontend",
  "backend", "database", "testing", "deployment", "quality assurance",
  "software development", "web development", "full stack", "developer",
  "engineer", "code", "debugging", "algorithm", "data structure",
  "computer science", "computer engineering", "electronics"
];

const Stupidgame = ({ onClose }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
      setGameStarted(false);
    }
    return () => clearTimeout(timer);
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    if (gameStarted) {
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      inputRef.current.focus();
    }
  }, [gameStarted]);

  const handleGetStartedClick = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 1);
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      setInputValue("");
    }
  };

  return (
    <div className="py-20 bg-blue-500 text-white text-center">
      {gameStarted ? (
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold">Speed Typing Test!</h2>
          <p className="mt-4">Score: {score}</p>
          <p className="mt-4">Time Left: {timeLeft}s</p>
          <p className="mt-4 text-2xl">{currentWord}</p>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="mt-4 p-2 text-black rounded"
          />
        </div>
      ) : gameOver ? (
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold">Game Over!</h2>
          <p className="mt-4">Your Score: {score}</p>
          <button
            className="mt-6 px-8 m-2 py-4 bg-[#333] text-white rounded-md hover:bg-gray-500"
            onClick={handleGetStartedClick}
          >
            Play Again
          </button>
          <button
            className="mt-6 px-8 m-2 py-4 bg-[#333] text-white rounded-md hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      ) : (
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold">Speed Typing Test!</h2>
            <p className="mt-4">Type the given word within 60 seconds to score points!</p>
          <button
            className="mt-6 px-8 py-4 bg-[#333] text-white rounded-md hover:bg-gray-500"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};

export default Stupidgame;

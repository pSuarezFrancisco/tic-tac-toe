"use client";

import { useState } from 'react';

const initialBoard = Array(9).fill(null);

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isCircleTurn, setIsCircleTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null); // To store the winning line
  const [isTie, setIsTie] = useState(false); // For tie detection

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  const checkWinner = (newBoard: (string | null)[]) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return { winner: newBoard[a], combination };
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || isTie) return;

    const newBoard = [...board];
    newBoard[index] = isCircleTurn ? 'O' : 'X';
    setBoard(newBoard);
    
    const gameStatus = checkWinner(newBoard);
    if (gameStatus) {
      setWinner(gameStatus.winner);
      setWinningLine(gameStatus.combination);
    } else if (newBoard.every((cell) => cell !== null)) {
      setIsTie(true); // All cells are filled and no winner -> It's a tie
    } else {
      setIsCircleTurn(!isCircleTurn);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsCircleTurn(true);
    setWinner(null);
    setWinningLine(null);
    setIsTie(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-500">
      <div className="relative grid grid-cols-3 gap-4 w-[300px] h-[300px] place-items-center">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`border-4 text-gray-700 border-gray-700 flex justify-center items-center text-4xl cursor-pointer bg-white leading-none h-20 w-20 ${
              winningLine?.includes(index) ? 'bg-green-200' : ''
            }`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      {winner && (
        <div className="mt-4 text-2xl font-bold">
          Player {winner} wins!
        </div>
      )}

      {isTie && !winner && (
        <div className="mt-4 text-2xl font-bold">
          {`It's a tie!`}
        </div>
      )}

      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default Game;

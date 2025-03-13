import { useState } from "react";

const schema = {
  commentary: "This code generates a Tic Tac Toe game with a 3x3 grid, allowing two players to take turns and showing the winner.",
  template: "nextjs-developer",
  title: "Tic Tac Toe",
  description: "A simple Tic Tac Toe game for two players.",
  additional_dependencies: [],
  has_additional_dependencies: false,
  install_dependencies_command: "",
  port: 3000,
  file_path: "pages/index.tsx",
  code: ""
}

const TicTacToe = () => {
  const [board, setBoard] = useState<string[][]>([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [turn, setTurn] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);

  const handleMove = (row: number, col: number) => {
    if (winner || board[row][col] !== "") return;
    const newBoard = [...board];
    newBoard[row][col] = turn;
    setBoard(newBoard);

    checkWinner();

    setTurn(turn === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "")
        setWinner(board[i][0]);
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "")
        setWinner(board[0][i]);
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "")
      setWinner(board[0][0]);
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "")
      setWinner(board[0][2]);
  };

  const resetGame = () => {
    setBoard([["", "", ""], ["", "", ""], ["", "", ""]]);
    setTurn("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      {winner && (
        <p className="text-lg font-bold mb-4">Player {winner} wins!</p>
      )}
      <div className="grid grid-cols-3 gap-4">
        {board.map((row, rowIndex) => row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex justify-center items-center cursor-pointer"
            onClick={() => handleMove(rowIndex, colIndex)}
          >
            {cell}
          </div>
        )))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
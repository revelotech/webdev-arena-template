import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RxReset } from "react-icons/rx";

const TicTacToe = () => {
  const [board, setBoard] = useState<string[][]>([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [turn, setTurn] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [xWins, setXWins] = useState<number>(0);
  const [oWins, setOWins] = useState<number>(0);

  const handleMove = (row: number, col: number) => {
    if (winner || board[row][col] !== "") return;
    const newBoard = [...board];
    newBoard[row][col] = turn;
    setBoard(newBoard);

    checkWinner(newBoard);

    setTurn(turn === "X" ? "O" : "X");
  };

  const checkWinner = (newBoard: string[][]) => {
    for (let i = 0; i < 3; i++) {
      if (newBoard[i][0] === newBoard[i][1] && newBoard[i][1] === newBoard[i][2] && newBoard[i][0] !== "") {
        setWinner(newBoard[i][0]);
        updateWins(newBoard[i][0]);
        return;
      }
      if (newBoard[0][i] === newBoard[1][i] && newBoard[1][i] === newBoard[2][i] && newBoard[0][i] !== "") {
        setWinner(newBoard[0][i]);
        updateWins(newBoard[0][i]);
        return;
      }
    }

    if (newBoard[0][0] === newBoard[1][1] && newBoard[1][1] === newBoard[2][2] && newBoard[0][0] !== "") {
      setWinner(newBoard[0][0]);
      updateWins(newBoard[0][0]);
      return;
    }
    if (newBoard[0][2] === newBoard[1][1] && newBoard[1][1] === newBoard[2][0] && newBoard[0][2] !== "") {
      setWinner(newBoard[0][2]);
      updateWins(newBoard[0][2]);
      return;
    }
  };

  const updateWins = (winner: string) => {
    if (winner === "X") {
      setXWins(xWins + 1);
    } else if (winner === "O") {
      setOWins(oWins + 1);
    }
  };

  const resetGame = () => {
    setBoard([["", "", ""], ["", "", ""], ["", "", ""]]);
    setTurn("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#232C46]">
      <h1 className="text-[24px] text-[white] font-bold mb-4">Tic Tac Toe</h1>

      <div className="mt-4 flex gap-4">
        <p className="border py-[12px] px-[28px] text-lg text-[white] items-center font-bold flex flex-col rounded-xl">
          X
          <span className="mt-2 text-[14px] text-center">You: {xWins}</span>
        </p>
        <p className="border py-[12px] px-[28px] text-lg items-center text-[white] font-bold flex flex-col rounded-xl">
          O
          <span className="mt-2 text-[14px] text-center">Bot: {xWins}</span>
        </p>
      </div>

      {winner && (
        <p className="text-lg font-bold text-[white] mt-6 mb-6">Player {winner} wins!</p>
      )}

      <div>
        <div className="grid grid-cols-3 gap-4 bg-[#3E4F6B] p-4 rounded-xl">
          {board.map((row, rowIndex) => row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="bg-[#232C46] text-[white] font-semibold rounded-xl w-16 h-16 flex justify-center items-center cursor-pointer"
              onClick={() => handleMove(rowIndex, colIndex)}
            >
              {cell}
            </div>
          )))}
        </div>

        <Button
          className="mt-8 w-full"
          variant="secondary"
          onClick={resetGame}
        >
          <RxReset />

          Reset Game
        </Button>
      </div>
    </div>
  );
};

export default TicTacToe;
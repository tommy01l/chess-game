import { useEffect, useState } from 'react';
import getValidMoves from '../moveLogic';

import Square from './Square';

interface BoardProps {
  state: Array<string | null>;
  handleMove: (nextSquareIndex: number, currentSquareIndex: number, updateSquare: (nextSquareIndex: number) => void) => void;
  whiteTurn: boolean
};

const Board = ({ state, handleMove, whiteTurn }: BoardProps) => {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  useEffect(() => {
    setSelectedSquare(null)
    squares
    //console.log(state)
  }, [state])

  let validMoves: number[] = [];
  if (selectedSquare !== null) {
    validMoves = getValidMoves(state, selectedSquare)
  }
  const handleSquareClick = (squareIndex: number) => {
    setSelectedSquare(squareIndex);
  };

  const handleSquareClickMove = (nextSquareIndex: number) => {
    if (selectedSquare === null) { console.log("error 2"); return }
    handleMove(nextSquareIndex, selectedSquare, () => handleSquareClick(nextSquareIndex))
  }


  const renderSquare = (i: number) => {
    const isBlack = (i + Math.floor(i / 8)) % 2 === 0;
    const isValid = validMoves.includes(i)
    const squareVal = state[i]
    let isTurn = false
    if (squareVal !== null) {
      isTurn = (squareVal.slice(0, 1) === "w") === whiteTurn
    }
    //console.log(`isWhite:${isTurn} squareVal${squareVal} isTurn${isTurn} `)
    return (
      <Square
        key={i}
        black={isBlack}
        num={i}
        img={state[i]}
        isSelected={i === selectedSquare}
        isValid={isValid}
        onClick={() => { isValid ? handleSquareClickMove(i) : (isTurn ? handleSquareClick(i) : (() => { })) }}
      />
    );
  };

  const squares: JSX.Element[] = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i));
  }

  return (
    <div className="chessboard">
      {squares}
    </div>
  );
};

export default Board;
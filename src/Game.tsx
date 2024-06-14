import { useState } from 'react';
import Board from './components/Board'

const Game = () => {
  const [gameState, setGameState] = useState<(string | null)[]>(Array(64).fill(null));
  const [whiteTurn, setWhiteTurn] = useState(true)

  function newGame() {
    const startPosition = [
      "bp8", "bp9", "bp10", "bp11", "bp12", "bp13", "bp14", "bp15", "br0", "br7", "bb1", "bb6", "bn2", "bn5", "bq4", "bk3",
      "wp48", "wp49", "wp50", "wp51", "wp52", "wp53", "wp54", "wp55", "wr56", "wr63", "wb57", "wb62", "wn61", "wn58", "wq60", "wk59"
    ];
    let newState = Array(64).fill(null)

    startPosition.forEach((val: string) => {
      newState[+(val.slice(2))] = val.slice(0, 2);
    })
    setGameState(newState)
    setWhiteTurn(true)
  };
  //console.log(gameState)

  const handleSquareClickMove = (nextSquareIndex: number, currentSquareIndex: number, updateSquare: (squareIndex: number) => void) => {
    let newState = gameState.splice(0)
    newState[nextSquareIndex] = newState[currentSquareIndex]
    newState[currentSquareIndex] = null
    updateSquare(nextSquareIndex)
    setGameState(newState)

    setWhiteTurn(!whiteTurn)
  }


  function onePiece() {
    const startPosition = ["wq1"]
    let newState = Array(64).fill(null)

    startPosition.forEach((val: string) => {
      newState[+(val.slice(2))] = val.slice(0, 2);
    })
    setGameState(newState)
    setWhiteTurn(true)
  };

  return (
    <>
      <div className="game-space">
        <div className="chessboard-container">
          <Board state={gameState} handleMove={handleSquareClickMove} whiteTurn={whiteTurn} />
          <button className="newGameButton"
            onClick={() => newGame()}>New Game</button>
        </div>
        <div className="score-container">
          <div>
            black Capture
          </div>
          <div>
            {whiteTurn ? "WHITE" : "BLACK"}
          </div>
          <div>
            white Capture
          </div>

        </div>
      </div>
      {/* <div className="score-container">
        <p>Score Here Todo!</p>
      </div> */}
    </>
  );





};

export default Game

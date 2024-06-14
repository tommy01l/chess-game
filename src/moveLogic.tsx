/*determines what are valid moves*/

const nightMoves = [-17, -15, 17, 15, 10, -10, 6, -6];
const bishopMoves = [7, -7, 9, -9];
const rookMoves = [8, -8, 1, -1];
const queenMoves = [7, -7, 9, -9, 1, -1, 8, -8];
const kingMoves = [8, -8, 7, -7, 9, -9, 1, -1];

export default function getValidMoves(gameState: (string | null)[], currentPos: number): number[] {
  const currentPieceInfo = getPiece(currentPos)
  console.log(currentPos)
  //console.log(gameState)
  if (currentPieceInfo === null) { console.log("error 1"); return [] }

  const piece = currentPieceInfo[0]
  const isBlack = currentPieceInfo[1]

  function inRange(i: number): boolean {
    return 0 <= i && i <= 63
  }
  const availableMoves: number[] = []

  switch (piece) {

    case 'p':

      const inStart = (8 <= currentPos && currentPos <= 15) || (48 <= currentPos && currentPos <= 55)

      let possibleCapture = isBlack ? [8, 9, 7] : [-8, -9, -7]
      possibleCapture.forEach((move) => {
        let nextMove = move + currentPos
        if (inRange(nextMove)) {
          const content = getPiece(nextMove);
          if (content !== null) {
            ((content[1] != isBlack) && (Math.abs(move) % 8 !== 0)) ? availableMoves.push(nextMove) : null
          }
          else {
            if ((Math.abs(move) % 8) === 0) {
              availableMoves.push(nextMove);
              const moveTwice = move * 2 + currentPos;
              (inStart && !getPiece(moveTwice)) ? availableMoves.push(moveTwice) : null
            }


          }
        }
      })
      console.log(availableMoves)
      break;

    case 'n':
      createAvailable(nightMoves, false);
      break
    case 'b':
      createAvailable(bishopMoves, true);
      break
    case 'r':
      createAvailable(rookMoves, true);
      break
    case 'q':
      createAvailable(queenMoves, true);
      console.log(availableMoves)
      break
    case 'k':
      createAvailable(kingMoves, false);
      break
    default:
      return []
      break

  }

  function getPiece(pos: number) {
    const name = gameState[pos];
    //console.log(gameState)
    if (!name) return null
    return [name.slice(1), name.slice(0, 1) == "b"]
  }

  function createAvailable(moves: number[], extra: boolean) {
    moves.forEach((move) => {

      let valid = true
      for (let i = 1; valid; i++) {
        const previous = (currentPos + move * (i - 1))
        const nextMove = (currentPos + move * i)
        const check = Math.abs((nextMove % 8) - (previous % 8))
        valid = extra ? !(check > 2) : false
        console.log(`${previous},${nextMove}`)
        if (inRange(nextMove) && (check <= 2)) {
          const content = getPiece(nextMove);
          if (!content) {
            availableMoves.push(nextMove);

          }
          else {
            content[1] === isBlack ? null : availableMoves.push(nextMove);
            valid = false
          }
        }
        else {
          valid = false
        }
        console.log(`check:${check} move:${move}`)
      }

    })
  }
  console.log(availableMoves)
  return availableMoves
} 
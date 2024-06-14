import React from 'react';
import './Piece.css';
interface PieceProps {
  piece: string | undefined
  isSelected: boolean
}


const Piece: React.FC<PieceProps> = ({ piece, isSelected }) => {
  return (
    <div className={`piece ${piece} ${isSelected ? 'selected' : null}`}>
    </div>
  );
};

export default Piece;
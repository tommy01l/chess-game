// src/components/Square.tsx

import React from 'react';
import Piece from './Piece';

interface SquareProps {
  black: boolean;
  num: number;
  img: string | null;
  isSelected: boolean;
  isValid: boolean;
  onClick: () => void
}

const Square: React.FC<SquareProps> = ({ black, num, img, isSelected, isValid, onClick }) => {

  return (
    <div className={`square ${isSelected ? 'selected' : null} ${isValid ? "validMove" : null} ${black ? 'black' : 'white'} ${img ? "occupied" : "validSpace"}`}
      onClick={onClick}>
      <Piece piece={`${img}`} isSelected={isSelected} />
      {img ? null : num}

    </div>
  );
};

export default Square;
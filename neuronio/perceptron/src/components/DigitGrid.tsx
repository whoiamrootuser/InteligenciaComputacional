
import React from 'react';

interface DigitGridProps {
  rows: number;
  cols: number;
  gridState: number[];
  onGridChange: (newGrid: number[]) => void;
}

const DigitGrid: React.FC<DigitGridProps> = ({ cols, gridState, onGridChange }) => {
  const handleClick = (index: number) => {
    const newGrid = [...gridState];
    newGrid[index] = newGrid[index] === 0 ? 1 : 0;
    onGridChange(newGrid);
  };

  return (
    <div
      className="grid gap-1.5 p-2 bg-slate-200 rounded-md shadow-inner"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        width: `${cols * 3.5}rem`,
        margin: '1rem auto',
      }}
    >
      {gridState.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`aspect-square rounded transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75
                      ${cell === 1 ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-300 hover:bg-slate-400'}`}
          aria-label={`Cell ${index + 1}, current state: ${cell === 1 ? 'active (red)' : 'inactive (light gray)'}`}
          style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
        />
      ))}
    </div>
  );
};

export default DigitGrid;
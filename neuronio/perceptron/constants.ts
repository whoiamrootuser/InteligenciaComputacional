
import type { DigitTrainingInstance } from './types';

const RAW_TRAINING_DATA: { digit: number, x: number[], t: number[] }[] = [
  { digit: 0, x: [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], t: [-1, -1, -1, -1] },
  { digit: 1, x: [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1], t: [-1, -1, -1, 1] },
  { digit: 2, x: [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1], t: [-1, -1, 1, -1] },
  { digit: 3, x: [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], t: [-1, -1, 1, 1] },
  { digit: 4, x: [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], t: [-1, 1, -1, -1] },
  { digit: 5, x: [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], t: [-1, 1, -1, 1] },
  { digit: 6, x: [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], t: [-1, 1, 1, -1] },
  { digit: 7, x: [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], t: [-1, 1, 1, 1] },
  { digit: 8, x: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], t: [1, -1, -1, -1] },
  { digit: 9, x: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], t: [1, -1, -1, 1] },
];




export const NUM_INPUT_FEATURES = 15;
export const NUM_OUTPUT_BITS = 4; 
export const GRID_ROWS = 5;
export const GRID_COLS = 3;

export const TRAINING_DATA: DigitTrainingInstance[] = RAW_TRAINING_DATA.map(item => ({
  digit: item.digit,
  input: item.x,
  target: item.t,
}));

export const TARGET_TO_DIGIT_MAP: Map<string, number> = new Map();
TRAINING_DATA.forEach(item => {
  TARGET_TO_DIGIT_MAP.set(item.target.join(','), item.digit);
});

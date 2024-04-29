import { boardType } from "../types/board";
import findEmptyValue from "./findEmptyValue";

export default function availableMoves(board: boardType) {
  const emptyIndex = findEmptyValue(board);

  const availableMoves: number[] = [];

  if (emptyIndex - 3 >= 0) availableMoves.push(emptyIndex - 3);
  if (emptyIndex + 3 < board.length) availableMoves.push(emptyIndex + 3);
  if (emptyIndex % 3 != 0) availableMoves.push(emptyIndex - 1);
  if ((emptyIndex + 1) % 3 != 0) availableMoves.push(emptyIndex + 1);

  return availableMoves;
}

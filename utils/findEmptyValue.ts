import { boardType } from "../types/board";

export default function findEmptyValue(board: boardType) {
  return board.indexOf(" ");
}

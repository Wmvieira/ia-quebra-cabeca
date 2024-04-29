import { boardType } from "../types/board";

export default function drawBoard(board: boardType) {
  const col1 = board.slice(0, 3);
  const col2 = board.slice(3, 6);
  const col3 = board.slice(6, 9);

  console.log(col1);
  console.log(col2);
  console.log(col3);
}

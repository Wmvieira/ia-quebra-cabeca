import { bfsMoves } from "../../types/bfs/bfsMoves";
import { boardType } from "../../types/board";

export default class BfsState {
  board: boardType;
  moves: bfsMoves;
}

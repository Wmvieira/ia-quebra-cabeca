import { boardType } from "../../types/board";

export default interface ISolverService {
  solve: (board: boardType) => boolean;
}

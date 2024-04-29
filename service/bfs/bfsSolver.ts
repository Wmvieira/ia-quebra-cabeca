import BfsState from "../../entity/bfs/BfsState";
import { boardType } from "../../types/board";
import availableMoves from "../../utils/availableMoves";
import drawBoard from "../../utils/drawBoard";
import findEmptyValue from "../../utils/findEmptyValue";
import isSolved from "../../utils/isSolved";
import ISolverService from "../interface/iSolverService";

export default class BfsSolver implements ISolverService {
  solve = (board: string): boolean => bfs(board);
}

function bfs(board: boardType) {
  const queue: BfsState[] = [{ board: board, moves: [] }];
  const visited = new Set();

  while (queue.length > 0) {
    const state = queue.shift();

    if (!state) return false;

    if (isSolved(state.board)) {
      logSolution(state);
      return true;
    }

    if (!visited.has(state.board)) {
      visited.add(state.board);
      queue.push(...generateNewBoards(state));
    }
  }

  return false;
}

const generateNewBoards = (state: BfsState) => {
  const { board, moves } = state;

  const emptyIndex = findEmptyValue(board);
  const possibleMoves = availableMoves(board);

  return possibleMoves.map((m) => {
    const newBoard = swap(board, m, emptyIndex);
    return { board: newBoard, moves: [...moves, newBoard] };
  });
};

const swap = (board: boardType, targetIndex: number, emptyIndex: number) => {
  const target = board[targetIndex];
  const empty = board[emptyIndex];

  let newBoard = "";
  for (let i = 0; i < board.length; i++) {
    if (i === targetIndex) {
      newBoard += empty;
    } else if (i === emptyIndex) {
      newBoard += target;
    } else {
      newBoard += board[i];
    }
  }

  return newBoard;
};

const logSolution = (solution: BfsState) => {
  solution.moves.forEach((sl) => {
    console.log("----------------");
    drawBoard(sl);
  });
};

import { boardType } from "../../types/board";
import availableMoves from "../../utils/availableMoves";
import drawBoard from "../../utils/drawBoard";
import findEmptyValue from "../../utils/findEmptyValue";
import isSolved from "../../utils/isSolved";
import ISolverService from "../interface/iSolverService";

interface AStarState {
  board: boardType;
  moves: string[];
  cost: number;
}

export default class AStarSolver implements ISolverService {
  solve = (board: string): boolean => aStar(board);
}

function aStar(board: boardType) {
  const initialState: AStarState = { board, moves: [], cost: 0 };
  const openSet: AStarState[] = [initialState];
  const closedSet = new Set<string>();

  while (openSet.length > 0) {
    const currentState = openSet.sort((a, b) => a.cost - b.cost)[0];
    openSet.splice(0, 1);

    if (isSolved(currentState.board)) {
      logSolution(currentState);
      return true;
    }

    closedSet.add(currentState.board);

    const emptyIndex = findEmptyValue(currentState.board);
    const possibleMoves = availableMoves(currentState.board);

    possibleMoves.forEach((move) => {
      const newBoard = swap(currentState.board, move, emptyIndex);
      if (!closedSet.has(newBoard)) {
        const newCost = currentState.cost + 1;
        const newState: AStarState = {
          board: newBoard,
          moves: [...currentState.moves, newBoard],
          cost: newCost,
        };
        openSet.push(newState);
      }
    });
  }

  return false;
}

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

const logSolution = (solution: AStarState) => {
  solution.moves.forEach((sl) => {
    console.log("----------------");
    drawBoard(sl);
  });
};

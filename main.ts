import BfsSolver from "./service/bfs/bfsSolver";
import iSolverService from "./service/interface/iSolverService";

const initialBoard = "1324 7865";

const solver: iSolverService = new BfsSolver();

solver.solve(initialBoard);

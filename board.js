/**
 * Draw the board
 * @param {string} board
 */
const drawBoard = (board) => {
  const col1 = board.slice(0, 3);
  const col2 = board.slice(3, 6);
  const col3 = board.slice(6, 9);

  console.log(col1);
  console.log(col2);
  console.log(col3);
};

/**
 * Find the index of the empty value
 * @param {string} board
 */
const findEmptyValue = (board) => {
  return board.indexOf(" ");
};

/**
 * Start the puzzle
 * @param {string} board
 */
const startPuzzle = (board) => {
  const map = new Map();

  drawBoard(board);

  move(board, map);
};

/**
 * Move the board for all possible states
 * @param {string} board
 * @param {Map} allStates
 */
const move = (board, allStates) => {
  const moves = availableMoves(board);
  const emptyIndex = findEmptyValue(board);

  if (allStates.has(board)) return;

  moves.forEach((m) => {
    const newBoard = swap(board, m, emptyIndex);

    addMove(board, newBoard, allStates);
  });
};

/**
 * Add the state to a map
 * @param {string} board
 * @param {string} move
 * @param {Map} allStates
 */
const addMove = (board, move, allStates) => {
  if (allStates.has(board))
    allStates.set(board, [...allStates.get(board), move]);
  else allStates.set(board, [move]);
};

/**
 * Swap the positions of two tiles in the board string
 * @param {string} board
 * @param {number} targetIndex
 * @param {number} emptyIndex
 * @returns {string}
 */
const swap = (board, targetIndex, emptyIndex) => {
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

/**
 * Find all moves given a random board
 * @param {string} board
 */
const availableMoves = (board) => {
  const emptyIndex = findEmptyValue(board);

  const availableMoves = [];

  if (emptyIndex - 3 >= 0) availableMoves.push(emptyIndex - 3);
  if (emptyIndex + 3 < board.length) availableMoves.push(emptyIndex + 3);
  if (emptyIndex % 3 != 0) availableMoves.push(emptyIndex - 1);
  if ((emptyIndex + 1) % 3 != 0) availableMoves.push(emptyIndex + 1);

  return availableMoves;
};

module.exports = { startPuzzle };

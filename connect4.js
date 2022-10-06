/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = "Raider"; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// The makeBoard function makes an array nested within an array. The outer array
// will represent the game board, the data of which will be created using the
//makeHtmlBoard function. The nested arrays will represent the rows of the game
//board and will be set to contain seven null values that represent the columns.
//Lines 29 & 30: creates six empty arrays (the game board height), and will have the data for the rows.
//Lines 31 & 32: pushes seven null values (the game board width) into each of the rows.
//Line 35: adds the row arrays that were created into the game board array that was made for the HTML table element.

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  for (let y = 0; y < HEIGHT; y++) {
    let row = [];
    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
//The makeHtmlBoard function is making the row on top of the game board where the
// players will click and their game piece will be dropped into that column.
//Line 48: creates a variable using querySelector, which returns the first element that matches the CSS selector "board"
//Line 50: creates the element for the top table row, where the players will drop their game pieces.
//Line 51: changes the top table row that was just made to an id of "column-top"
//Line 52: allows the player to click the top row above the gameboard and will run the handleClick function for every click

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // These lines of code are creating the data cells of the top row above the game board,
  // and gives them each an ID of "x".
  //Line 62: creates the 7 cells of the "width" (columns) by iterating seven times (because width =7)
  //Line 63: creates the element "td" that will make up the data cells of the table
  //Line 64: give the data cells that were just made an ID of "x"
  //Line 65: adds the cells to the top of the rows in the table
  //Line 67: adds the top table row to the htmlBoard element in HTML

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //These lines of code are creating the remaining rows and columns and giving them
  //each unique IDs of y-x.
  //Line 80: creates 6 rows by iterating six times (height = 6)
  //Line 81: creates the element "tr" which will make up the remaining rows on the game board
  //Line 82: loops over the six rows that were just created to make a cell for each
  //Line 83: creates the separate data content cells of the table,"td"
  //Line 84: gives each of the cells created a unique ID, y-x
  //Line 85: adds the cells to the row
  //Line 87: adds the rows to the board

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

const togglePlayer = () => {
  return currPlayer === "Raider"
    ? (currPlayer = "Football")
    : currPlayer === "Football"
    ? (currPlayer = "Raider")
    : (currPlayer = "Football");
};
/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  selectedDiv = document.getElementById(y + "-" + x);
  newDiv = document.createElement("div");
  newDiv.classList.add("piece", currPlayer);
  newDiv.setAttribute("id", y + "-" + x);
  selectedDiv.append(newDiv);
  board[y][x] = currPlayer;

  // const piece = document.createElement("div");
  // piece.classList.add("piece");
  // piece.classList.add(`p${currPlayer}`);
  // piece.style.top = -50 * (y + 2);

  // const spot = document.getElementById(`${y}-${x}`);
  // spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(() => alert(msg), 500);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  togglePlayer();

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  // board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("It's a tie!");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

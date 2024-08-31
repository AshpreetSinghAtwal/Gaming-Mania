// Get player names and colors
var player1Name = prompt("Player One: Enter Your Name, you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2Name = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(237, 45, 73)';

// Initialize game state
var currentPlayerIndex = 0;
var currentName = player1Name;
var currentColor = player1Color;

// Get the game board
var board = $('table tr');
var boardSize = { rows: 6, cols: 7 };

// Helper functions
function getButton(rowIndex, colIndex) {
  return board.eq(rowIndex).find('td').eq(colIndex).find('button');
}

function getButtonColor(rowIndex, colIndex) {
  return getButton(rowIndex, colIndex).css('background-color');
}

function setButtonColor(rowIndex, colIndex, color) {
  getButton(rowIndex, colIndex).css('background-color', color);
}

function checkBottom(colIndex) {
  for (var row = boardSize.rows - 1; row >= 0; row--) {
    if (getButtonColor(row, colIndex) === 'rgb(128, 128, 128)') {
      return row;
    }
  }
  return null; // no available moves in this column
}

function isBoardFull() {
  for (var col = 0; col < boardSize.cols; col++) {
    if (checkBottom(col) !== null) {
      return false; // there are still available moves
    }
  }
  return true; // the board is full
}

function checkWin(rowIndex, colIndex, color) {
  function checkDirection(direction) {
    var count = 0;
    for (var i = 0; i < 4; i++) {
      var newRow = rowIndex + direction.row * i;
      var newCol = colIndex + direction.col * i;
      if (newRow >= 0 && newRow < boardSize.rows && newCol >= 0 && newCol < boardSize.cols) {
        if (getButtonColor(newRow, newCol) === color) {
          count++;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return count === 4;
  }

  return checkDirection({ row: 0, col: 1 }) || // horizontal
         checkDirection({ row: 1, col: 0 }) || // vertical
         checkDirection({ row: 1, col: 1 }) || // diagonal (top-left to bottom-right)
         checkDirection({ row: -1, col: 1 }); // diagonal (bottom-left to top-right)
}

function checkWinInDirection(rowIndex, colIndex, color, direction) {
  var count = 0;
  for (var i = 0; i < 4; i++) {
    var newRow = rowIndex + direction.row * i;
    var newCol = colIndex + direction.col * i;
    if (newRow >= 0 && newRow < boardSize.rows && newCol >= 0 && newCol < boardSize.cols) {
      if (getButtonColor(newRow, newCol) === color) {
        count++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return count === 4;
}

function horizontalWinCheck() {
  for (var row = 0; row < boardSize.rows; row++) {
    for (var col = 0; col < boardSize.cols - 3; col++) {
      if (checkWinInDirection(row, col, currentColor, { row: 0, col: 1 })) {
        return true;
      }
    }
  }
  return false;
}

function verticalWinCheck() {
  for (var col = 0; col < boardSize.cols; col++) {
    for (var row = 0; row < boardSize.rows - 3; row++) {
      if (checkWinInDirection(row, col, currentColor, { row: 1, col: 0 })) {
        return true;
      }
    }
  }
  return false;
}

function diagonalWinCheck() {
  for (var row = 0; row < boardSize.rows - 3; row++) {
    for (var col = 0; col < boardSize.cols - 3; col++) {
      if (checkWinInDirection(row, col, currentColor, { row: 1, col: 1 }) ||
          checkWinInDirection(row, col, currentColor, { row: -1, col: 1 })) {
        return true;
      }
    }
  }
  return false;
}

function gameEnd(winningPlayer) {
  for (var col = 0; col < boardSize.cols; col++) {
    for (var row = 0; row < boardSize.rows; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer + " has won! Refresh your browser to play again!").css("fontSize", "50px");
    }
  }
}

$('.board button').on('click', function() {
  var col = $(this).closest("td").index();
  var bottomAvail = checkBottom(col);
  setButtonColor(bottomAvail, col, currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    gameEnd(currentName);
  } else if (isBoardFull()) {
    gameEnd("It's a draw!");
  }

  currentPlayerIndex = (currentPlayerIndex + 1) % 2;
  currentName = currentPlayerIndex === 0 ? player1Name : player2Name;
  currentColor = currentPlayerIndex === 0 ? player1Color : player2Color;

  $('h3').text(currentName + ": it is your turn, please pick a column to drop your " + (currentPlayerIndex === 0 ? "blue" : "red") + " chip.");
});
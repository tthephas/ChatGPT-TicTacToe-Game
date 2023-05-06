const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function handleMove(square, index) {
    if (board[index] === '' && !gameOver) {
      board[index] = currentPlayer;
      square.classList.add(currentPlayer.toLowerCase());
      checkForWinner();
      if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  }
  

function checkForWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        showGameOverMessage(`Player ${currentPlayer} wins!`);
        return;
      }
    }
  
    if (board.every(square => square !== '')) {
      gameOver = true;
      showGameOverMessage("It's a tie!");
      return;
    }
  }
  
function showGameOverMessage(msg) {
    message.textContent = msg;
    restartButton.style.display = 'block';
}
  
  

function restart() {
	currentPlayer = 'X';
	board = ['', '', '', '', '', '', '', '', ''];
	gameOver = false;
	message.textContent = `Player ${currentPlayer}'s turn`;
	restartButton.style.display = 'none';

	for (let square of squares) {
		square.classList.remove('x', 'o');
	}

	squares.forEach((square, index) => {
		square.addEventListener('click', () => handleMove(square, index));
	});
}

restart();

restartButton.addEventListener('click', restart);

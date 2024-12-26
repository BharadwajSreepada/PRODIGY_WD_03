const startBtn = document.getElementById('startBtn');
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const messageDiv = document.getElementById('message');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

startBtn.addEventListener('click', startGame);

function startGame() {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameBoard.style.display = 'grid';
    messageDiv.style.display = 'none';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell'; // Reset cell classes
        cell.style.pointerEvents = 'auto';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer} Wins!`;
        messageDiv.style.display = 'block';
        highlightWinningCells();
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== '')) {
        messageDiv.textContent = 'It\'s a Draw!';
        messageDiv.style.display = 'block';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            combination.forEach(index => cells[index].classList.add('winning-cell'));
            return true;
        }
        return false;
    });
}

function highlightWinningCells() {
    cells.forEach(cell => {
        if (cell.classList.contains('winning-cell')) {
            cell.style.pointerEvents = 'none'; // Disable clicks on winning cells
        }
    });
}

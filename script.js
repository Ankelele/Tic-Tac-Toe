const TicTacToeGame = (function () {
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let firstPlayerType = 'human'; 
    let secondPlayerType = 'human'; 

    function makeMove(cellIndex) {
        if (gameBoard[cellIndex] === '' && gameActive) {
            gameBoard[cellIndex] = currentPlayer;
            displayBoard();
            if (checkWin()) {
                displayWinner(`Player ${currentPlayer} wins!`);
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== '')) {
                displayWinner("It's a draw!");
                gameActive = false;
            } else {
                togglePlayer();
                if (currentPlayer === 'X' && firstPlayerType === 'ai') {
                    setTimeout(makeAIMove, 500);
                } else if (currentPlayer === 'O' && secondPlayerType === 'ai') {
                    setTimeout(makeAIMove, 500);
                }
            }
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    function displayBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    function displayWinner(message) {
        document.getElementById('winner-text').textContent = message;
    }

    function resetBoard() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        displayWinner('');
        displayBoard();
        if (currentPlayer === 'X' && firstPlayerType === 'ai') {
            setTimeout(makeAIMove, 500);
        } else if (currentPlayer === 'O' && secondPlayerType === 'ai') {
            setTimeout(makeAIMove, 500);
        }
    }

    function init() {
        displayBoard();
        document.querySelectorAll('.cell').forEach((cell, index) => {
            cell.addEventListener('click', () => makeMove(index));
        });
        document.getElementById('reset-button').addEventListener('click', resetBoard);

        
        document.getElementById('first-player-select').addEventListener('change', function () {
            firstPlayerType = this.value;
            resetBoard();
        });

        document.getElementById('second-player-select').addEventListener('change', function () {
            secondPlayerType = this.value;
            resetBoard();
        });
    }

    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    TicTacToeGame.init();
});
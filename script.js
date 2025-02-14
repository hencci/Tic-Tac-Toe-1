// Gameboard Module (stores the game state)
const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];  // An array representing the grid

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";  // Reset every spot on the board
        }
    };

    const getBoard = () => board;

    const setMark = (index, mark) => {
        if (board[index] === "") {  // Ensure the spot is empty
            board[index] = mark;
        }
    };

    return { getBoard, setMark, resetBoard };

})();

// Player Factory (Represents each player)
const Player = (name, mark) => {
    return { name, mark };
};

// Game Module (Handles the core logic of the game)
const Game = (() => {
    let currentPlayer;
    let winner = null;
    let gameOver = false;

    const startGame = (player1, player2) => {
        Gameboard.resetBoard();
        currentPlayer = player1;  // Player 1 starts the game
        winner = null;
        gameOver = false;
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winner = currentPlayer;
                gameOver = true;
                return;
            }
        }

        if (!board.includes("")) {  // If there's no empty spot left, it's a tie
            winner = "Tie";
            gameOver = true;
        }
    };

    const makeMove = (index) => {
        if (gameOver) return;

        Gameboard.setMark(index, currentPlayer.mark); // Mark the board
    };
})();
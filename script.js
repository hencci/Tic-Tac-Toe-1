// Gameboard Module (stores the game state)
const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];  // An array representing the grid

    const resetBoard = () => {
        board.fill("", 0, board.length); // Reset the board to an empty state
    };

    const getBoard = () => board; // Returns the current state of the board

    // Sets a mark (X or O) on the board at the given index if it's empty
    const setMark = (index, mark) => {
        if (board[index] === "") {  // Ensure the spot is empty
            board[index] = mark;
            return true;
        }
        return false;
    };

    return { getBoard, setMark, resetBoard };

})();

// Player Factory (Represents each player)
const Player = (name, mark) => {
    return { name, mark };
};

// Game Module (Handles the core logic of the game)
const Game = (() => {
    let currentPlayer, player1, player2;
    let winner = null;
    let gameOver = false;

    const startGame = () => {
        const name1 = document.getElementById("player1").value || "Player 1";
        const name2 = document.getElementById("player2").value || "Player 2";
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        currentPlayer = player1;  // Player 1 starts the game
        winner = null;
        gameOver = false;
        Gameboard.resetBoard();
        renderBoard();
        document.getElementById("winText").textContent = "";
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    // Checks if there is a winner or if the game is a tie
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
                document.getElementById("winText").textContent = `${winner.name} Wins!`;
                return;
            }
        }

        if (!board.includes("")) {  // If there's no empty spot left, it's a tie
            winner = "Tie";
            gameOver = true;
            document.getElementById("winText").textContent = "It's a Tie!";
        }
    };

    const makeMove = (index) => {
        if (gameOver) return;

        if (Gameboard.setMark(index, currentPlayer.mark)) {
            renderBoard(); // Update the board UI
            checkWinner();  // Check if the game has a winner
            if (!gameOver) {
                switchPlayer();  // Switch the turn
            }
        };
    };

    // Renders the board UI with updated marks and event listeners
    const renderBoard = () => {
        const board = Gameboard.getBoard();
        const gridElements = document.querySelectorAll('.grid');
        gridElements.forEach((cell, index) => {
            cell.textContent = board[index]; // Update cell with mark
            cell.removeEventListener("click", cellClick);
            if (!gameOver) {
                cell.addEventListener("click", cellClick); // Add click listener
            }
        });
    };

    // Handles click event on a grid cell
    const cellClick = (event) => {
        const index = event.target.getAttribute("cellIndex");
        makeMove(index);
    };
})();
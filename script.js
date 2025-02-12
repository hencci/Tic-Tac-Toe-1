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
})();
// HTML
const playerText = document.getElementById("playerText");
const restartBtn = document.getElementById("restartBtn");
const boxes = document.querySelectorAll(".box");
const winnerIndicator = getComputedStyle(document.body).getPropertyValue(
    "--winning-blocks"
);

// Variable
let win = false;

// Symbols
const O_SYMBOL = "O";
const X_SYMBOL = "X";

// Game
let currentPlayer = X_SYMBOL;
let spaces = Array(9).fill(null);

// Functions
const startGame = () => {
    boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

const boxClicked = (e) => {
    const id = e.target.id;

    if (!spaces[id] && !win) {
        spaces[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;
        if (playerHasWon() !== false) {
            playerText.innerHTML = `Player ${currentPlayer} has won!`;
            win = true;
            const winningBlocks = playerHasWon();
            winningBlocks.forEach((block) => {
                document.getElementById(block).style.backgroundColor =
                    winnerIndicator;
            });
            return;
        }
        currentPlayer = currentPlayer === X_SYMBOL ? O_SYMBOL : X_SYMBOL;
    }
};

const playerHasWon = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }

    return false;
};

// Event Listeners
restartBtn.addEventListener("click", () => {
    spaces = Array(9).fill(null);
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
    });
    currentPlayer = X_SYMBOL;
    playerText.innerHTML = "Tic Tac Toe";
    win = false;
});

document.addEventListener("DOMContentLoaded", startGame);

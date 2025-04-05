let statusText = document.getElementById('playerText');
let resetButton = document.getElementById('restartBtn');
let cells = Array.from(document.getElementsByClassName('box'));
let turnIndicator = document.getElementById('turn');

const SAILBOAT = "platnohodka.png";
const STEAMBOAT = "parahod.png";

let activePlayer = SAILBOAT;
let boardState = new Array(9).fill(null);
let gameActive = true;

function startGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', handleCellClick);
    }
}

function handleCellClick(event) {
    let index = event.target.id;

    if (!gameActive || boardState[index] !== null) {
        return;
    }

    boardState[index] = activePlayer;
    addImageToCell(event.target, activePlayer);

    if (checkWinner()) {
        statusText.innerHTML = Winner();
        gameActive = false;
        return;
    }

    if (isBoardFull()) {
        statusText.innerHTML = "It's a draw!";
        gameActive = false;
        return;
    }

    switchPlayer();
    Turn();
}

function addImageToCell(cell, player) {
    let image = document.createElement("img");
    image.src = player;
    cell.appendChild(image);
}

function switchPlayer() {
    if (activePlayer === SAILBOAT) {
        activePlayer = STEAMBOAT;
    } else {
        activePlayer = SAILBOAT;
    }
}

function Turn() {
    if (activePlayer === SAILBOAT) {
        turnIndicator.innerText = "Sailboat's turn";
    } else {
        turnIndicator.innerText = "Steamboat's turn";
    }
}

function Winner() {
    if (activePlayer === SAILBOAT) {
        return "Sailboat wins!";
    } else {
        return "Steamboat wins!";
    }
}

function isBoardFull() {
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === null) {
            return false;
        }
    }
    return true;
}

const winPatterns = [
    [0,1,2], [0,3,6], [1,4,7],
    [2,5,8], [3,4,5], [6,7,8],
    [0,4,8], [2,4,6]
];

function checkWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
        let [a, b, c] = winPatterns[i];

        if (boardState[a] !== null &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    for (let i = 0; i < boardState.length; i++) {
        boardState[i] = null;
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }

    activePlayer = SAILBOAT;
    gameActive = true;
    statusText.innerHTML = 'Sea Battle';
    turnIndicator.innerText = "Sailboat's turn";
}

startGame();
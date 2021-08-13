console.log("First line in main.js");

const TILE_STATE_EMPTY = 0;
const TILE_STATE_BLACK = 1;
const TILE_STATE_WHITE = 2;

var lastStoneColor = 1;

class Tile {
    constructor(state, x, y) {
        this.state = state;
        this.x = x;
        this.y = y;
    }
    isEmpty() {
        // Return whether this tile is empty (a bool)
        return this.state == TILE_STATE_EMPTY;
    }
    hasBlackPiece() {
        // Return whether the piece on this tile is black
        return this.state == TILE_STATE_BLACK;
    }
    hasWhitePiece() {
        return this.state == TILE_STATE_WHITE;
    }
}

// Constants
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

const buttonStartGame = document.getElementById("btn-start-game");
const buttonEndGame = document.getElementById("btn-end-game");

let isWhoseTurn = BLACK;
let boardSize = 15;
let boardEdgeWidth = 10;
let stoneDiameter = 30;
let stoneSep = 5;

let board = [];     // Should be a 2D array of Tile
let tileDivs = [];  // 1D array of document elements

function initBoard() {
    // Set value of board to a 2D array whose size if boardSize * boardSize
    for (let i = 0; i < boardSize; ++i) {  // loop rows
        row = []
        for (let j = 0; j < boardSize; ++j) {  // loop cols
            tile = new Tile(TILE_STATE_EMPTY, i, j);
            row.push(tile);
            console.log(i.toString() + "," + j.toString());
        }
        board.push(row);
    }
    
    console.log(board);
    drawBoard(); // erase
}

function genBoardLines() {
    let padding = `${boardEdgeWidth + Math.round(stoneDiameter / 2)}px`;
    function genVerLine() {
        let line = document.createElement("div");
        line.setAttribute("class", "board-line-ver");
        line.style.top = padding;
        line.style.bottom = padding;
        return line;
    }

    function genHorLine() {
        let line = document.createElement("div");
        line.setAttribute("class", "board-line-hor");
        line.style.left = padding;
        line.style.right = padding;
        return line;
    }

    let gameBoard = document.getElementById("game-board");
    let boardLinesContainer = document.getElementById("board-lines-container");
    // Generate grid lines on board
    for (let i = 0; i < boardSize; ++i) {
        // boardLinesContainer.appendChild(verLine);
        // boardLinesContainer.appendChild(horLine);
        
        
        let offset = `${boardEdgeWidth + i * (stoneDiameter + stoneSep) + Math.round(stoneDiameter / 2)}px`;
        let verLine = genVerLine();
        let horLine = genHorLine();
        verLine.style.left = offset;
        horLine.style.top = offset;
        gameBoard.appendChild(horLine);
        gameBoard.appendChild(verLine);
    }
}

function drawBoard() {
    // Loop each tile, and create a corresponding div, then set it as 
    // child of "game-board" div.

    // Store tile divs in an array for faster access later
    let gameBoard = document.getElementById("game-board");
    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j < boardSize; j++) {
            tileDiv = document.createElement("div");
            tileDiv.setAttribute("class", "tile-divs");
            tileDiv.style.left = `${boardEdgeWidth + j * (stoneDiameter + stoneSep)}px`;
            tileDiv.style.top = `${boardEdgeWidth + i * (stoneDiameter + stoneSep)}px`;
            tileDiv.setAttribute("id", "tile: " + i.toString() + "," + j.toString());
            tileDiv.setAttribute("onclick", `putStoneAt(${i}, ${j})`);
            tileDivs.push(tileDiv);  // The index of this element is (i * boardSize + j)
        }
    }

    
    // Set each tile div as children of "game-board" div.
    for (tileDiv of tileDivs) {
        gameBoard.appendChild(tileDiv);
    }
}

function putStoneAt(x, y) {
    modifyStoneColor(x, y);
    nextTurn();
}

function modifyStoneColor(x, y) {
    let tile = getTileDiv(x, y);
    if (isWhoseTurn == BLACK) {
        tile.style.backgroundColor = "black";
    } else if (isWhoseTurn == WHITE) {
        tile.style.backgroundColor = "white";
    }
}

function nextTurn() {
    if (isWhoseTurn == BLACK) {
        isWhoseTurn = WHITE;
    } else {
        isWhoseTurn = BLACK;
    }
}

function getTileDiv(x, y) {
    // Return tile div at position (x, y)
    return tileDivs[x * boardSize + y];
}

function isWon(lastPiece) {
    // Check if the given piece participate in a 5-in-a-row
}

function onClickBoard(x, y) {
    // This is called when a tile div is clicked
}

function showBoard() {
    // Set style of board depending on current pieces on the board
};

function startGame() {
    // turn all stones to white
    tileDiv = document.getElementsByClassName("tile-divs");
    for (let i = 0; i < tileDiv.length; i++) {
        tileDiv[i].style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
    lastStoneColor = 1;

    buttonStartGame.disabled = true;
    buttonEndGame.disabled = false;
    
    // show pulse animation on board
    document.getElementById('game-board').className = 'start';
}

function endGame() {
    document.getElementById('game-board').className = '';
    buttonStartGame.disabled = false;
    buttonEndGame.disabled = true;
}

function onLoad() {
    genBoardLines();
    initBoard();
}
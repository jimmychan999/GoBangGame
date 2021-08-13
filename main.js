console.log("First line in main.js");

const TILE_STATE_EMPTY = 0;
const TILE_STATE_BLACK = 1;
const TILE_STATE_WHITE = 2;

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
const BLACK = 0;
const WHITE = 1;

let isWhoseTurn = BLACK;
let boardSize = 15;

let board = [];  // Should be a 2D array of Tile
let tileDivs = [];

function initBoard() {
    console.log("initBoard()");
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
    console.log("genBoardLine()");
    function genVerLine() {
        let line = document.createElement("div");
        line.setAttribute("class", "board-line-ver");
        return line;
    }

    function genHorLine() {
        let line = document.createElement("div");
        line.setAttribute("class", "board-line-hor");
        return line;
    }

    let gameBoard = document.getElementById("game-board");
    // Generate grid lines on board
    for (let i = 0; i < boardSize; ++i) {
        verLine = genVerLine();
        verLine.style.left = `${10 + i * 35 + 15}px`;
        horLine = genHorLine();
        horLine.style.top = `${10 + i * 35 + 15}px`;
        gameBoard.appendChild(verLine);
        gameBoard.appendChild(horLine);
    }
}

genBoardLines();

function drawBoard() {
    // Loop each tile, and create a corresponding div, then set it as 
    // child of "game-board" div.

    // Store tile divs in an array for faster access later
    let tileDivs = [];
    let gameBoard = document.getElementById("game-board");
    for(let i = 0; i < boardSize; i++) {
        for(let j = 0; j < boardSize; j++) {
            tileDiv = document.createElement("div");
            tileDiv.setAttribute("class", "tile-divs");
            tileDiv.style.left = `${10 + j * 35}px`;
            tileDiv.style.top = `${10 + i * 35}px`;
            tileDiv.setAttribute("id", "tile: " + i.toString() + "," + j.toString());
            tileDiv.setAttribute("onclick", `modifyStoneColor(${i}, ${j}, ${2})`);
            tileDivs.push(tileDiv);
        }
    }
    
    // Set each tile div as children of "game-board" div.
    for (tileDiv of tileDivs) {
        gameBoard.appendChild(tileDiv);
    }
}

function testAlert(x) {
    if (Number.isInteger(x)){

        alert(x)
    }
}
function modifyStoneColor(xtile, ytile, color) {
    tile = document.getElementById("tile: " + xtile + "," + ytile);
    // alert(color)
    // if (color == 1) {
    //     tile.style.background-color == "white"
    // }
    if (color == '2') {
        // alert("heakjlfksd")}
        tile.style.backgroundColor = "black";
    }
    // }
    // else {
    //     tile.style.background-color == "transparent"
    // }
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
}
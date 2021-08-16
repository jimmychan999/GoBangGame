// Constants
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

// CSS constants
const COLOR_STR_TRANSPARENT = "rgba(0, 0, 0, 0)";
const COLOR_STR_WHITE = "rgb(245, 245, 245)";
const COLOR_STR_BLACK = "rgb(100, 100, 100)";
const COLOR_STR_HIGHLIGHT_WHITE = "rgba(245, 245, 245, .35)";
const COLOR_STR_HIGHLIGHT_BLACK = "rgba(100, 100, 100, .35)";
const BOX_SHADOW = "1px 5px 7px -2px rgb(38 38 38 / 15%), 0px 10px 13px -7px #0000009e";
const BOX_SHADOW_BLACK_STONE = "inset -10px -6px 16px rgba(0, 0, 0, 0.8), " + BOX_SHADOW;
const BOX_SHADOW_WHITE_STONE = "inset -5px -3px 8px rgba(0, 0, 0, 0.3), " + BOX_SHADOW;
const BACKGROUND_IMAGE_STONE = "inset -5px -3px 8px rgba(0, 0, 0, 0.3)";


// Elements
const buttonStartGame = document.getElementById("btn-start-game");
const buttonEndGame = document.getElementById("btn-end-game");
const gameBoard = document.getElementById("game-board");


// Starting parameters
let isWhoseTurn = BLACK;
let boardSize = 19;
let boardEdgeWidth = 10;
let stoneDiameter = 30;
let stoneSep = 5;

// Other global variables
let board = [];     // 2D array that represent current state of the board
let tileDivs = [];  // 1D array of document elements

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

    let boardLinesContainer = document.getElementById("board-lines-container");
    // Generate grid lines on board
    for (let i = 0; i < boardSize; ++i) {
        let offset = `${boardEdgeWidth + i * (stoneDiameter + stoneSep) + Math.round(stoneDiameter / 2)}px`;
        let verLine = genVerLine();
        let horLine = genHorLine();
        verLine.style.left = offset;
        horLine.style.top = offset;
        gameBoard.appendChild(horLine);
        gameBoard.appendChild(verLine);
    }
}

function initBoard() {
    genBoardLines();
    genTileDivs();
    initBoardArray();
}

function initBoardArray() {
    // assume board = []
    for (let i = 0; i < boardSize; ++i) {
        let row = [];
        for (let j = 0; j < boardSize; ++j) {
            row.push(EMPTY);
        }
        board.push(row);
    }
}

function setBoardArrayEmpty() {
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            board[i][j] = EMPTY;
        }
    }
}

function genTileDivs() {
    // Store tile divs in an array for faster access later
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            tileDiv = document.createElement("div");
            tileDiv.setAttribute("class", "tile-divs");
            tileDiv.style.left = `${boardEdgeWidth + j * (stoneDiameter + stoneSep)}px`;
            tileDiv.style.top = `${boardEdgeWidth + i * (stoneDiameter + stoneSep)}px`;
            tileDiv.setAttribute("id", "tile: " + i.toString() + "," + j.toString());
            tileDiv.setAttribute("onclick", `onClickDivAt(${i}, ${j})`);

            let onMouseEnter = (e) => {
                if (board[i][j] == EMPTY) {
                    if (isWhoseTurn == BLACK) {
                        e.target.style.backgroundColor = COLOR_STR_HIGHLIGHT_BLACK;
                    } else {
                        e.target.style.backgroundColor = COLOR_STR_HIGHLIGHT_WHITE;
                    }
                }
            };
            let onMouseLeave = (e) => {
                if (board[i][j] == EMPTY) {
                    e.target.style.backgroundColor = COLOR_STR_TRANSPARENT;
                }
            };

            tileDiv.addEventListener('mouseenter', onMouseEnter);
            tileDiv.addEventListener('mouseleave', onMouseLeave);

            tileDivs.push(tileDiv);  // The index of this element is (i * boardSize + j)
        }
    }
    
    // Set each tile div as children of "game-board" div.
    for (tileDiv of tileDivs) {
        gameBoard.appendChild(tileDiv);
    }
}

function isTileOccupied(x, y) {
    return board[x][y] != EMPTY;
}

function onClickDivAt(x, y) {
    if (!isTileOccupied(x, y)) {
        putStoneAt(x, y);
        isWon(x, y);
        nextTurn();
    }
}

function putStoneAt(x, y) {
    let tile = getTileDiv(x, y);
    if (isWhoseTurn == BLACK) {
        tile.style.backgroundColor = COLOR_STR_BLACK;
        tile.style.boxShadow = BOX_SHADOW_BLACK_STONE;
        tile.backgroundImage = BACKGROUND_IMAGE_STONE;
        board[x][y] = BLACK;
    } else if (isWhoseTurn == WHITE) {
        tile.style.backgroundColor = COLOR_STR_WHITE;
        tile.style.boxShadow = BOX_SHADOW_WHITE_STONE;
        tile.backgroundImage = BACKGROUND_IMAGE_STONE;
        board[x][y] = WHITE;
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

function isWon(x, y) {
    // Check if the given piece participate in a 5-in-a-row
    // empty, out of board (negative and bigger than length)
    
    if (checkDirectionWin(x, y)) {
        if (board[x][y] == BLACK) {
            alert("BLACK won")
        } else {
            alert("WHITE won")
        }
    }
}

function checkDirectionWin(x, y) {
    
    let CurrentStoneColor = board[x][y];
    let stoneConsecCountHori = 1;
    let stoneConsecCountVert = 1;
    let stoneConsecCountDiagonal1 = 1;
    let stoneConsecCountDiagonal2 = 1;

    // checking 5 horizontally
    for(let i = 1; i < 5; ++i) {
        if (!isTileOccupied(x, y+i) || board[x][y+i] != CurrentStoneColor) {
            break;
        }
        stoneConsecCountHori++
    }
    for(let i = 1; i < 5; ++i) {
        if (!isTileOccupied(x, y-i) || board[x][y-i] != CurrentStoneColor) {
            break;
        }
        stoneConsecCountHori++
    }

    console.log(stoneConsecCountHori + "h");
    if (stoneConsecCountHori >= 5) {
        return true;
    }

    // checking 5 vertically
    for(let i = 1; i < 5; ++i) {
        if (!isTileOccupied(x+i, y) || board[x+i][y] != CurrentStoneColor) {
            break;
        }
        stoneConsecCountVert++
    }
    for(let i = 1; i < 5; ++i) {
        if (!isTileOccupied(x-i, y) || board[x-i][y] != CurrentStoneColor) {
            break;
        }
        stoneConsecCountVert++
    }
    console.log(stoneConsecCountVert + "v");
    if (stoneConsecCountVert >= 5) {
        return true;
    }

    // checking horizontal left top
    for(let i = 1; i < 5; ++i) {
        if (!isTileOccupied(x+i, y+i) || board[x+i][y+i] != CurrentStoneColor) {
            break;
        }
        stoneConsecCountDiagonal1++
    }
    for(let i = 1; i < 5; ++i) {
        if (!isTileOccupied(x-i, y-i) || board[x-i][y-i] != CurrentStoneColor) {
            break;
        }
        stoneConsecCountDiagonal1++
    }
    console.log(stoneConsecCountDiagonal1 + "d1");
    if (stoneConsecCountDiagonal1 >= 5) {
        return true;
    }

    // checking horizontal right top
    for(let i = 1; i < 5; ++i) {
        if (!isTileOccupied(x+i, y-i) || board[x+i][y-i] != CurrentStoneColor) {
            break;
        }
        stoneConsecCountDiagonal2++
    }
    for(let i = 1; i < 5; ++i) {
        if (!isTileOccupied(x-i, y+i) || board[x-i][y+i] != CurrentStoneColor) {
            break;
        }
        stoneConsecCountDiagonal2++
    }
    console.log(stoneConsecCountDiagonal2 + "d2");
    if (stoneConsecCountDiagonal2 >= 5) {
        return true;
    }

}

function showBoard() {
    // Set style of board depending on current pieces on the board
};

function hideBoardStones() {
    for (let tileDiv of tileDivs) {
        tileDiv.style.backgroundColor = COLOR_STR_TRANSPARENT;
        tileDiv.style.boxShadow = "0 0 0 0 rgba(0,0,0,0)";
    }
}

function clearBoard() {
    setBoardArrayEmpty();
    hideBoardStones();
}

function startGame() {
    clearBoard();
    buttonStartGame.disabled = true;
    buttonEndGame.disabled = false;
    
    // show pulse animation on board
    gameBoard.className = 'start';
}

function endGame() {
    gameBoard.className = '';
    buttonStartGame.disabled = false;
    buttonEndGame.disabled = true;
}

function onLoad() {
    initBoard();
}



// add clicking sound effects


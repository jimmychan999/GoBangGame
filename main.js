// Constants
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

// CSS constants
const COLOR_STR_TRANSPARENT = "rgba(0, 0, 0, 0)";
const COLOR_STR_WHITE = "rgb(245, 245, 245)";
const COLOR_STR_BLACK = "rgb(100, 100, 100)";
const COLOR_STR_HIGHLIGHT_WHITE = "rgba(245, 245, 245, .35)";
const COLOR_STR_HIGHLIGHT_BLACK = "rgba(100, 100, 100, .35)";
const BOX_SHADOW = "1px 3px 4px -2px rgb(38 38 38 / 40%), 0px 5px 6px -3px #000000bb";
const BOX_SHADOW_BLACK_STONE = "inset -10px -6px 16px rgba(0, 0, 0, 0.8), " + BOX_SHADOW;
const BOX_SHADOW_WHITE_STONE = "inset -5px -3px 8px rgba(0, 0, 0, 0.3), " + BOX_SHADOW;
const BACKGROUND_IMAGE_STONE = "inset -5px -3px 8px rgba(0, 0, 0, 0.3)";


// Elements
const gameBody = document.getElementById("game-body");
const buttonStartGame = document.getElementById("btn-start-game");
const buttonEndGame = document.getElementById("btn-end-game");
const gameBoard = document.getElementById("game-board");
const tileContainer = document.getElementById("game-board-tiles");
const gridContainer = document.getElementById("game-board-grids");


// Starting parameters
let curTheme = THEME_LIGHT;
let isWhoseTurn = BLACK;

let boardNumRows = 15;
let boardLength = 540;    // The length of the sides of the outermost gridline
let boardEdgeLength = 30; // Distance from outermost line to edge of board
let stoneDiameter = 32;

let boardBorderRadius = 15;
// let stoneSep = 5;  // TODO: remove

// Other global variables
let board = [];     // 2D array that represent current state of the board
let tileDivs = [];  // 1D array of document elements
let verLines = [];
let horLines = [];

function genBoardLines() {
    let padding = `${boardEdgeLength}px`;
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

    // Generate grid lines on board
    for (let i = 0; i < boardNumRows; ++i) {
        let verLine = genVerLine();
        let horLine = genHorLine();
        verLines.push(verLine);
        horLines.push(horLine);
        gridContainer.appendChild(horLine);
        gridContainer.appendChild(verLine);
    }
}

function updateBoardSize() {
    /**
     * Resize board according to boardLength and boardEdgeLength
     */
    let height = 2 * boardEdgeLength + boardLength;
    let width = height;
    gameBoard.style.height = `${height}px`;
    gameBoard.style.width = `${width}px`;
    gameBoard.style.borderRadius = `${boardBorderRadius}px`;
}

function initBoard() {
    console.log("Initting board");
    genBoardLines();
    genTileDivs();
    initBoardArray();
    resizeBoard();
}

function initBoardArray() {
    // assume board = []
    for (let i = 0; i < boardNumRows; ++i) {
        let row = [];
        for (let j = 0; j < boardNumRows; ++j) {
            row.push(EMPTY);
        }
        board.push(row);
    }
}

function setBoardArrayEmpty() {
    for (let i = 0; i < boardNumRows; ++i) {
        for (let j = 0; j < boardNumRows; ++j) {
            board[i][j] = EMPTY;
        }
    }
}

function genTileDivs() {
    // Store tile divs in an array for faster access later
    for (let i = 0; i < boardNumRows; i++) {
        for (let j = 0; j < boardNumRows; j++) {
            tileDiv = document.createElement("div");
            tileDiv.setAttribute("class", "tile-div");
            // tileDiv.style.left = `${boardEdgeLength + j * (stoneDiameter + stoneSep)}px`;
            // tileDiv.style.top = `${boardEdgeLength + i * (stoneDiameter + stoneSep)}px`;
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

            tileDivs.push(tileDiv);  // The index of this element is (i * boardNumRows + j)
        }
    }
    
    // Set each tile div as children of "game-board" div.
    for (tileDiv of tileDivs) {
        tileContainer.appendChild(tileDiv);
    }
}

function resizeTileDivs() {
    for (let i = 0; i < boardNumRows; i++) {
        for (let j = 0; j < boardNumRows; j++) {
            let tileDiv = getTileDiv(i, j);
            // Distance between neighboring lines
            let rowGap = boardLength / (boardNumRows - 1);
            let y = boardEdgeLength + i * rowGap - stoneDiameter / 2; // horizontal
            let x = boardEdgeLength + j * rowGap - stoneDiameter / 2; // vertical
            tileDiv.style.left = y.toString() + "px";
            tileDiv.style.top = x.toString() + "px";
            tileDiv.style.width = stoneDiameter.toString() + "px";
            tileDiv.style.height = stoneDiameter.toString() + "px";
        }
    }
}

function resizeBoardLines() {
    let padding = `${boardEdgeLength}px`;
    for (let i = 0; i < boardNumRows; i++) {
        // Distance between neighboring lines
        let rowGap = boardLength / (boardNumRows - 1);
        
        let offset = boardEdgeLength + i * rowGap;
        let offsetStr = `${offset}px`; 

        // Set style
        let verLine = verLines[i];
        verLine.style.top = padding;
        verLine.style.bottom = padding;
        verLine.style.left = offsetStr;
        
        let horLine = horLines[i];
        horLine.style.top = offsetStr;
        horLine.style.left = padding;
        horLine.style.right = padding;
    }
}

function updateBoardSizeParams() {
    /**
     * Set parameters that control the appearance of the game board.
     * Specifically, set update the following variables:
     * 
     *   boardLength, boardEdgeLength, stoneDiameter, boardBorderRadius
     * 
     */
    let gameBodyWidth = gameBody.clientWidth * 0.9;
    let gameBodyHeight = document.body.clientHeight * 0.7;
    boardLength = Math.min(gameBodyHeight, gameBodyWidth);
    boardEdgeLength = boardLength * 0.06;
    let lineGap = boardLength / (boardNumRows - 1);
    stoneDiameter = lineGap * 0.84;
    boardBorderRadius = stoneDiameter / 2;
}

function resizeBoard() {
    updateBoardSizeParams();
    updateBoardSize();
    resizeTileDivs();
    resizeBoardLines();
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
    return tileDivs[x * boardNumRows + y];
}

function isWon(x, y) {
    // Check if the given piece participate in a 5-in-a-row
    // empty, out of board (negative and bigger than length)
    
    if (checkDirectionWin(x, y)) {
        if (board[x][y] == BLACK) {
            setTimeout(function() {
                console.log("BLACK won")
                animationShowGamOverText("BLACK WON");
                setTimeout(function() {
                    document.querySelector(".popupBarContainer").style.backgroundColor = "#000000aa";
                }, 2)
            }, 20)
        } else {
            setTimeout(function() {
                console.log("WHITE won")
                animationShowGamOverText("WHITE WON");
                setTimeout(function() {
                    document.querySelector(".popupBarContainer").style.backgroundColor = "#ffffffaa";
                }, 2)
            }, 20)
        }
        endGame();
    }
}

function isOutOfBounds(x, y) {
    return (x < 0 || x >= boardNumRows || y < 0 || y >= boardNumRows)
}

function checkDirectionWin(x, y) {
    
    let currentStoneColor = board[x][y];
    let stoneConsecCountHori = 1;
    let stoneConsecCountVert = 1;
    let stoneConsecCountDiagonal1 = 1;
    let stoneConsecCountDiagonal2 = 1;

    // checking 5 horizontally
    for(let i = 1; i < 5; ++i) {
        if (isOutOfBounds(x, y+i)) {
            break;
        }
        if (!isTileOccupied(x, y+i) || board[x][y+i] != currentStoneColor) {
            break;
        }
        stoneConsecCountHori++
    }
    for(let i = 1; i < 5; ++i) {
        if (isOutOfBounds(x, y-i)) {
            break;
        }
        if (!isTileOccupied(x, y-i) || board[x][y-i] != currentStoneColor) {
            break;
        }
        stoneConsecCountHori++
    }
    if (stoneConsecCountHori >= 5) {
        return true;
    }

    // checking 5 vertically
    for(let i = 1; i < 5; ++i) {
        if (isOutOfBounds(x+i, y)) {
            break;
        }
        if (!isTileOccupied(x+i, y) || board[x+i][y] != currentStoneColor) {
            break;
        }
        stoneConsecCountVert++
    }
    for(let i = 1; i < 5; ++i) {
        if (isOutOfBounds(x-i, y)) {
            break;
        }
        if (!isTileOccupied(x-i, y) || board[x-i][y] != currentStoneColor) {
            break;
        }
        stoneConsecCountVert++
    }
    if (stoneConsecCountVert >= 5) {
        return true;
    }

    // checking diagonal left top
    for(let i = 1; i < 5; ++i) {
        if (isOutOfBounds(x+i, y+i)) {
            break;
        }
        if (!isTileOccupied(x+i, y+i) || board[x+i][y+i] != currentStoneColor) {
            break;
        }
        stoneConsecCountDiagonal1++
    }
    for(let i = 1; i < 5; ++i) {
        if (isOutOfBounds(x-i, y-i)) {
            break;
        }
        if (!isTileOccupied(x-i, y-i) || board[x-i][y-i] != currentStoneColor) {
            break;
        }
        stoneConsecCountDiagonal1++
    }
    if (stoneConsecCountDiagonal1 >= 5) {
        return true;
    }

    // checking diagonal right top
    for(let i = 1; i < 5; ++i) {
        if (isOutOfBounds(x+i, y-i)) {
            break;
        }
        if (!isTileOccupied(x+i, y-i) || board[x+i][y-i] != currentStoneColor) {
            break;
        }
        stoneConsecCountDiagonal2++
    }
    for(let i = 1; i < 5; ++i) {
        if (isOutOfBounds(x-i, y+i)) {
            break;
        }
        if (!isTileOccupied(x-i, y+i) || board[x-i][y+i] != currentStoneColor) {
            break;
        }
        stoneConsecCountDiagonal2++
    }
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

function initTheme() {
    let storedTheme = localStorage.getItem("theme");
    // alert(storedTheme);
    if (storedTheme == null) {
        curTheme = THEME_LIGHT;
    } else {
        curTheme = storedTheme;
    }
    setTheme(curTheme);
}

function setTheme(theme) {
    localStorage.setItem("theme", theme);
    document.getElementById("theme-switcher").href = "../css/themes/" + theme + ".css";
}

function changeTheme() {
    if (curTheme == THEME_LIGHT) {
        curTheme = THEME_DARK;
    } else {
        curTheme = THEME_LIGHT;
    }
    setTheme(curTheme);
}


function clearBoard() {
    setBoardArrayEmpty();
    hideBoardStones();
}

function startGameBtnClick() {
    animationRemoveGameOverText();
    startGame();
}

function startGame() {
    clearBoard();
    buttonStartGame.disabled = true;
    buttonEndGame.disabled = false;
    
    // show pulse animation on board
    gameBoard.className = 'start';
}

function endGameBtnClick() {
    animationShowGamOverText("Game Over");
    endGame();
}

function endGame() {
    gameBoard.className = '';
    buttonStartGame.disabled = false;
    buttonEndGame.disabled = true;
}

function goToMainMenu() {
    console.log("backToMainMenu()");
    window.location.href = "index.html";
}

function onResize() {
    resizeBoard();
}

function onLoad() {
    initTheme();
    initBoard();
    window.onresize = onResize;
}

function onloadHelp() {
    initTheme();
}

// add clicking sound effects


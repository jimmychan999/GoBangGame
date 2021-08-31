

window.onclick = function(event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
}

function changeBoardSize(value) {
    localStorage.setItem("boardSize", value);
    console.log(value);
}

function boardSizeToIndex(value) {
    return value - 4
}

function onLoadSettings() {
    initTheme();
    boardSize = localStorage.getItem("boardSize")
    boardSizeDropdown = document.getElementById("board-size-dropdown")
    boardSizeDropdown.selectedIndex = boardSizeToIndex(boardSize)
}
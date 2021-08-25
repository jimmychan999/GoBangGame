function animationShowGamOverText(text) {
  animationRemoveGameOverText();

  const gameBoard = document.querySelector("#game-board");
  
  

  const popupGameOverContainer = document.createElement("div");
  popupGameOverContainer.className = "popupGameOverContainer";
  gameBoard.appendChild(popupGameOverContainer);

  const popupGameOver = document.createElement("div");
  popupGameOver.className = "popupGameOver";
  popupGameOverContainer.appendChild(popupGameOver);
  
  const popupGameOverTextContainer = document.createElement("div");
  popupGameOverTextContainer.className = "popupGameOverTextContainer";
  popupGameOver.appendChild(popupGameOverTextContainer);
  
  const popupGameOverText = document.createElement("div");
  popupGameOverText.className = "popupGameOverText";
  popupGameOverText.innerHTML = text;
  popupGameOverTextContainer.appendChild(popupGameOverText);
  
  const popupBarContainer = document.createElement("div");
  popupBarContainer.className = "popupBarContainer";
  popupGameOver.appendChild(popupBarContainer);

}

function animationRemoveGameOverText() {
  // if any game over popup is showing, remove it
  document.querySelectorAll(".popupGameOverContainer").forEach(e => e.remove());
}
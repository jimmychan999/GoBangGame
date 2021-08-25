function animationShowGamOverText(text) {
  // if any game over popup is showing, remove it
  document.querySelectorAll(".popupGameOver").forEach(e => e.remove());

  const a = document.createElement("div");
  
  a.className = "popupGameOver";
  //a.innerHTML = text;
  document.querySelector("#game-board").appendChild(a);

  
  const popupGameOverTextContainer = document.createElement("div");
  popupGameOverTextContainer.className = "popupGameOverTextContainer";
  a.appendChild(popupGameOverTextContainer);
  
  const popupGameOverText = document.createElement("div");
  popupGameOverText.className = "popupGameOverText";
  popupGameOverText.innerHTML = text;
  popupGameOverTextContainer.appendChild(popupGameOverText);
  
  const popupBarContainer = document.createElement("div");
  popupBarContainer.className = "popupBarContainer";
  a.appendChild(popupBarContainer);

}
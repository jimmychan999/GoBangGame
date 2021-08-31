const placeStoneUrl = "../assets/audio/placeStone.mp3"

const victoryMusic = new Audio("../assets/audio/victoryMusic.mp3")
const placeStoneSound = new Audio("../assets/audio/placeStone.mp3")

function playVictoryMusic() {
	victoryMusic.play()
}


function stopAudio() {
    victoryMusic.pause();
    victoryMusic.currentTime = 0;
}



function playPlaceStoneSound() {
	var audio = document.createElement("audio");
	audio.src = placeStoneUrl;
	audio.addEventListener("ended", function () {
		gameBoard.removeChild(this);
	}, false);
	gameBoard.appendChild(audio)
	audio.play();  
}
const placeStoneUrl = "../assets/audio/placeStone.mp3"

const victoryMusic = new Audio("../assets/audio/victoryMusic.mp3")
const placeStoneSound = new Audio("../assets/audio/placeStone.mp3")

let isMuted = false

function playVictoryMusic() {
	if (isMuted) return
	victoryMusic.play()
}


function stopAudio() {
    victoryMusic.pause();
    victoryMusic.currentTime = 0;
}



function playPlaceStoneSound() {
	// Create a new HTML element for each audio for playing multiple instances
	// simultaneously.
	if (isMuted) return
	var audio = document.createElement("audio");
	audio.src = placeStoneUrl;
	audio.addEventListener("ended", function () {
		gameBoard.removeChild(this);
	}, false);
	gameBoard.appendChild(audio)
	audio.play();  
}

function onClickMuteButton() {
	// If muted, enable audio, else, disable audio.
	// Then change button text accordingly.
    buttonMute = document.getElementById("btn-mute")
	isMuted = localStorage.getItem("isMuted")
	if (isMuted == null) isMuted = false

	if (isMuted == true) {
        isMuted = false
        buttonMute.textContent = "Audio is enabled"
    } else {
		ismuted = true;
		buttonMute.textContent = "Audio is disabled"
    }
	localStorage.setItem("isMuted", isMuted)
}
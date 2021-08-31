const placeStoneUrl = "../assets/audio/placeStone.mp3"
const victoryMusic = new Audio("../assets/audio/victoryMusic.mp3")
const placeStoneSound = new Audio("../assets/audio/placeStone.mp3")

const buttonMute = document.getElementById("btn-mute")

let isMuted = false

function playVictoryMusic() {
	console.log('muted:', isMuted)
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
	console.log('muted:', isMuted)
	if (isMuted) return
	var audio = document.createElement("audio");
	audio.src = placeStoneUrl;
	audio.addEventListener("ended", function () {
		gameBoard.removeChild(this);
	}, false);
	gameBoard.appendChild(audio)
	audio.play();
}

function updateMuteButtonText() {
	if (isMuted) {
        buttonMute.textContent = "Audio is disabled"
    } else {
		buttonMute.textContent = "Audio is enabled"
    }
}

function onClickMuteButton() {
	// If muted, enable audio, else, disable audio.
	// Then change button text accordingly.
	console.log("on click mute button")
	isMuted = localStorage.getItem("isMuted")

	// localStorage might return string instead of bool
	if (typeof isMuted == "string") {
		// isMuted is string
		if (isMuted == "true") isMuted = true
		else isMuted = false
	}
	// if (isMuted == null) isMuted = false

	console.log(isMuted)
	if (isMuted == true) {
        isMuted = false
    } else {
		isMuted = true;
	}
	console.log(isMuted)

	localStorage.setItem("isMuted", isMuted)
	updateMuteButtonText()
}

function initAudioManager() {
	isMuted = localStorage.getItem("isMuted")
	console.log("muted:", isMuted)
    updateMuteButtonText()
}
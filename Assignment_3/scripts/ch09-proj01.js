const symbolPlay = '⯈';
const symbolPause = '❚ ❚';
const files = ['Nature-8399','River-655','Waterfall-941','Wave-2737'];

//video controls
const playButton = document.getElementById("play");
const backButton = document.querySelector("button[data-skip='-5']");
const forwardButton = document.querySelector("button[data-skip='5']");
const stopButton = document.getElementById("stop");
const volumeRange = document.getElementById("volume");
const progressFilled = document.getElementById("progressFilled");

files.forEach(i => {
    const img = document.createElement("img");
    const img_bar = document.querySelector("aside");

    img.src='images/'+ i + '.jpg';
    img.addEventListener('click', function(){
        switch_vid(i);
    });

    img_bar.appendChild(img);
});

// video controls
//video play and pause
playButton.addEventListener("click", function() {
    if (vidPlayer.paused) {
        vidPlayer.play();
        playButton.textContent = symbolPause; // Change button text to pause symbol
    } else {
        vidPlayer.pause();
        playButton.textContent = symbolPlay; // Change button text to play symbol
    }
});
//move back 5 secs, and move forward 5 secs
//Backward
backButton.addEventListener("click", function() {
    vidPlayer.currentTime -= 5; // Skip backward 5 seconds
});
//Forward
forwardButton.addEventListener("click", function() {
    vidPlayer.currentTime += 5; // Skip forward 5 seconds
});
//stop
stopButton.addEventListener("click", function() {
    vidPlayer.pause();
    vidPlayer.currentTime = 0; // Set video playback to the beginning
    playButton.textContent = "⯈"; // Change button text to play symbol
});
//volume
volumeRange.addEventListener("input", function() {
    vidPlayer.volume = volumeRange.value;
});
//video progress
vidPlayer.addEventListener("timeupdate", function() {
    const progress = (vidPlayer.currentTime / vidPlayer.duration) * 100;
    progressFilled.style.width = progress + "%";
    progressFilled.style.backgroundColor = "#ff000";
});
progress.addEventListener("click", function(event) {
    const progressWidth = progress.offsetWidth;
    const clickX = event.offsetX;
    const percentClicked = (clickX / progressWidth) * 100;
    const newTime = (percentClicked / 100) * vidPlayer.duration;
    vidPlayer.currentTime = newTime;
});

//functions
function switch_vid(vid_title){
    const videoPlayer = document.getElementById("vidPlayer");
    videoPlayer.src = 'videos/' + vid_title + '.mp4';
}


/** @type {HTMLVideoElement} */
const videoPlayer = document.querySelector(".player");

/** @type {HTMLButtonElement} */
const playBtn = document.querySelector("#play-pause");

/** @type {HTMLButtonElement} */
const stopBtn = document.querySelector("#stop");

/** @type {HTMLProgressElement} */
const progress = document.querySelector("#progress")

/** @type {HTMLSpanElement} */
const timestamp = document.querySelector(".timestamp")

// 关闭 player 默认控件
videoPlayer.controls = false;

// 更改视频暂停
function changeVideoPause() {
  if (videoPlayer.paused){
    videoPlayer.play()
  }else {
    videoPlayer.pause()
  }
}

// 更新视频时间
function updateVideoTime() {
  progress.value = (videoPlayer.currentTime / videoPlayer.duration) * 100 ;

  let mins =  Math.floor(videoPlayer.currentTime / 60) ;
  if (mins < 10) {
    mins = "0" + String(mins)
  }

  let secs = Math.floor(videoPlayer.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs)
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

playBtn.addEventListener("click",   changeVideoPause)

stopBtn.addEventListener("click", ()=>{
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
})

videoPlayer.addEventListener("timeupdate", updateVideoTime)

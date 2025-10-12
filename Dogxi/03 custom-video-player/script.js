/** @type {HTMLVideoElement} */
const videoPlayer = document.querySelector(".player");

/** @type {HTMLButtonElement} */
const playBtn = document.querySelector("#play-pause");

/** @type {HTMLButtonElement} */
const stopBtn = document.querySelector("#stop");

/** @type {HTMLProgressElement} */
const progress = document.querySelector("#progress");

/** @type {HTMLSpanElement} */
const timestamp = document.querySelector("#timestamp");

// 关闭 player 默认控件
videoPlayer.controls = false;

// 更改视频暂停
function changeVideoPause() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<span class="fa fa-pause fa-2x"></span>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<span class="fa fa-play fa-2x"></span>`;
  }
}

// 更新视频时间
function updateVideoTime() {
  progress.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;

  let mins = Math.floor(videoPlayer.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let secs = Math.floor(videoPlayer.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// 播放和暂停按钮

playBtn.addEventListener("click", changeVideoPause);

stopBtn.addEventListener("click", () => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
});

// 视频点击播放
videoPlayer.addEventListener("click", changeVideoPause);

// 视频更新时间
videoPlayer.addEventListener("timeupdate", updateVideoTime);

videoPlayer.addEventListener("ended", () => {
  console.log("end!");
  playBtn.innerHTML = `<span class="fa fa-play fa-2x"></span>`;
});

// 进度条控制时间
progress.addEventListener("click", (e) => {
  videoPlayer.currentTime =
    (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
  updateVideoTime();
});

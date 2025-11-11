/** @type {HTMLButtonElement} */
const prevBtn = document.querySelector("#prevBtn");

/** @type {HTMLButtonElement} */
const playBtn = document.querySelector("#playBtn");

/** @type {HTMLButtonElement} */
const nextBtn = document.querySelector("#nextBtn");

/** @type {HTMLAudioElement} */
const audioEl = document.querySelector("#musicAudio");

/** @type {HTMLImageElement} */
const coverEl = document.querySelector("#cover");

const PLAY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24">
    <path fill="currentColor" d="M7 6v12l10-6z" />
  </svg>`;

const PAUSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 7h3v10H8zm5 0h3v10h-3z"/></svg>`;

const LRC_TEXT = `
[00:00.00] 作词 : Ooi Penny
[00:00.00] 作曲 : Ooi Penny
[00:00.00] 编曲 : xocialboy
[00:00.00] 木吉他 : Penny
[00:00.00] 和音 : sleepybrian
[00:00.00] 制作人 : xocialboy
[00:00.00]哈基米啊南北绿豆
[00:01.99]哈呀库奶露
[00:03.62]南北绿豆哈吉嘎西
[00:05.65]椰打耶南北绿豆
[00:07.67]哦嘛自立曼波哈吉
[00:09.52]南北绿了豆
[00:11.15]啊西噶南北绿豆耶打
[00:13.19]曼波哈基米
[00:15.00]哈基米啊南北绿豆
[00:16.98]哈呀库奶露
[00:18.58]南北绿豆哈吉嘎西
[00:20.59]椰打耶南北绿豆
[00:22.57]哦嘛自立曼波哈吉
[00:24.37]南北绿了豆
[00:26.09]啊西噶南北绿豆耶打
[00:28.18]曼波哈基米
[00:29.97]哈基米啊南北绿豆
[00:31.81]哈呀库奶露
[00:33.50]南北绿豆哈吉嘎西
[00:35.54]椰打耶南北绿豆
[00:37.43]哦嘛自立曼波哈吉
[00:39.36]南北绿了豆
[00:40.87]啊西噶南北绿豆耶打
[00:43.06]曼波哈基米
[00:44.90]哈基米啊南北绿豆
[00:46.79]哈呀库奶露
[00:48.44]南北绿豆哈吉嘎西
[00:50.46]椰打耶南北绿豆
[00:52.34]哦嘛自立曼波哈吉
[00:54.27]南北绿了豆
[00:55.87]啊西噶南北绿豆耶打
[00:57.96]曼波哈基米
[00:59.75]哈基米啊南北绿豆
[01:01.72]哈呀库奶露
[01:03.42]南北绿豆哈吉嘎西
[01:05.43]椰打耶南北绿豆
[01:07.28]哦嘛自立曼波哈吉
[01:09.23]南北绿了豆
[01:10.93]啊西噶南北绿豆耶打
[01:13.00]曼波哈基米
[01:14.67]哈基米啊南北绿豆
[01:16.64]哈呀库奶露
[01:18.34]南北绿豆哈吉嘎西
[01:20.46]椰打耶南北绿豆
[01:22.19]哦嘛自立曼波哈吉
[01:24.22]南北绿了豆
[01:25.82]啊西噶南北绿豆耶打
[01:27.88]曼波哈基米
[01:29.69]哈基米啊南北绿豆
[01:31.52]哈呀库奶露
[01:33.26]南北绿豆哈吉嘎西
[01:35.28]椰打耶南北绿豆
[01:37.16]哦嘛自立曼波哈吉
[01:39.09]南北绿了豆
[01:40.82]啊西噶南北绿豆耶打
[01:42.84]曼波哈基米
[01:44.53]哈基米啊南北绿豆
[01:46.53]哈呀库奶露
[01:48.25]南北绿豆哈吉嘎西
[01:50.27]椰打耶南北绿豆
[01:52.07]哦嘛自立曼波哈吉
[01:54.05]南北绿了豆
[01:55.76]啊西噶南北绿豆耶打
[01:57.81]曼波哈基米
[01:58.81] 吉他 : Penny
[01:58.95] 人声 : 何水水
`;

function changePlay() {
  if (audioEl.paused) {
    // 播放
    audioEl.play();
    playBtn.innerHTML = PAUSE_SVG;
    coverEl.classList.add("rotate");
  } else {
    // 暂停
    audioEl.pause();
    playBtn.innerHTML = PLAY_SVG;
    coverEl.classList.remove("rotate");
  }
}

playBtn.addEventListener("click", (e) => {
  changePlay();
});

function parseLrc(lrcText) {
  const lines = lrcText.split(/\r?\n/);
  const entries = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const timeTagRegex = /\[(\d{1,2}):(\d{1,2})(?:\.(\d{1,3}))?\]/g;
    const times = [];
    let m;
    while ((m = timeTagRegex.exec(line)) !== null) {
      const mm = Number(m[1]);
      const ss = Number(m[2]);
      const frac = m[3] ? Number(m[3]) : 0;
      const ms =
        mm * 60000 +
        ss * 1000 +
        (m[3] ? (m[3].length === 2 ? frac * 10 : frac) : 0);

      times.push(ms);
    }

    const text = line.replace(timeTagRegex, "").trim();
    if (times.length > 0) {
      for (const t of times) {
        entries.push({ timeMs: t, text });
      }
    }
  }

  return entries;
}

const lrcs = parseLrc(LRC_TEXT);

/** @type {HTMLSpanElement} */
const lyricEl = document.querySelector("#lyric");

function searchLyric(time) {
  if (!lrcs || lrcs.length === 0) return "";
  if (time >= lrcs[lrcs.length - 1].timeMs) {
    return lrcs[lrcs.length - 1].text;
  }

  for (let i = 0; i < lrcs.length; i++) {
    if (lrcs[i].timeMs <= time && time < lrcs[i + 1].timeMs) {
      return lrcs[i].text;
    }
  }

  return lrcs[0].text;
}

// 音频播放
audioEl.addEventListener("timeupdate", (e) => {
  progressEl.value = audioEl.currentTime / audioEl.duration;

  // 修改歌词
  lyricEl.innerText = searchLyric(audioEl.currentTime * 1000);
});

/** @type {HTMLProgressElement} */
const progressEl = document.querySelector("#progress");

progressEl.addEventListener("click", (e) => {
  if (!audioEl.duration) return; // 防止 NaN

  const rect = progressEl.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  const targetTime = percentage * audioEl.duration;

  audioEl.currentTime = Math.max(0, Math.min(targetTime, audioEl.duration));
});

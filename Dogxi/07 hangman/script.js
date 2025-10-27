/** @type {HTMLDivElement} */
const wordEl = document.querySelector("#word");

/** @type {HTMLDivElement} */
const wrongLettersEl = document.querySelector("#wrong-letters");

/** @type {SVGLineElement[]} */
const figures = document.querySelectorAll(".figure-part");

/** @type {HTMLDivElement} */
const notificationEl = document.querySelector("#notification");

/** @type {HTMLDivElement} */
const popupContainerEl = document.querySelector("#popup-container");

/** @type {HTMLButtonElement} */
const playBtn = document.querySelector("#play-btn");

const words = ["abc", "def"];

// 游戏变量
let word = "";
let isGaming = true;
let inputWord = "";
/** @type {Array} */
let wrongLetters = [];

/** @type {HTMLSpanElement[]} */
let letterSpans = [];

// 获取随机单词
function fetchRandomWord() {
  console.log("1.获取单词");
  return words[Math.floor(Math.random() * words.length)];
}

// 设置当前单词
function setCurrentWord(word) {
  console.log("2.设置单词");
  inputWord = " ".repeat(word.length);

  // 初始 word 元素
  const spans = `<span class="letter"></span>`.repeat(word.length);
  wordEl.innerHTML = spans;

  // 缓存 spans
  letterSpans = Array.from(wordEl.children);

  // 初始化数据
  wrongLetters = [];
  updateWrongLetter();
}

// 监控单词输入
window.addEventListener("keydown", (e) => {
  if (e.key.length === 1 && /[A-Za-z]/.test(e.key)) {
    updateWord(e.key.toLowerCase());
  } else {
    return;
  }

  // 重新开始
  if (!isGaming && e.key.toLowerCase() === "r") {
    play();
  }
});

function showNotification(msg) {
  notificationEl.innerText = msg;
  notification.classList.add("show");

  setTimeout(() => {
    notificationEl.classList.remove("show");
  }, 1500);
}

// 更新单词
function updateWord(letter) {
  if (!isGaming || !word) return;
  if (inputWord.includes(letter) || wrongLetters.includes(letter)) {
    return showNotification(`you have already input the letter`);
  }

  let isWrong = true;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      inputWord[i] = letter;
      letterSpans[i].innerText = letter;
      isWrong = false;
    }
  }

  if (isWrong) {
    wrongLetters.push(letter);

    // 游戏失败
    if (wrongLetters.length >= figures.length) {
      isGaming = false;
      popupContainerEl.classList.add("show");
      return;
    }

    updateWrongLetter();
  }
}

// 更新错误单词
function updateWrongLetter() {
  if (wrongLetters.length > 0) {
    figures[wrongLetters.length - 1].classList.add("show");

    wrongLettersEl.innerHTML = `
      <p>Wrong</p>
      ${wrongLetters.join(",")}
      `;
  } else {
    wrongLettersEl.innerHTML = "";
    figures.forEach((figure) => {
      figure.classList.remove("show");
    });
  }
}

function play() {
  popupContainerEl.classList.remove("show");
  setTimeout(init, 100);
  init();
}

// play 按钮
playBtn.addEventListener("click", play);

function init() {
  // 目前没用的错误处理
  try {
    word = fetchRandomWord();
    setCurrentWord(word);
    isGaming = true;
  } catch (err) {
    console.log(err);
  }
}

// 初始化
init();

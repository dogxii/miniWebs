/** @type {HTMLDivElement} */
const wordEl = document.querySelector("#word");

/** @type {HTMLDivElement} */
const wrongLettersEl = document.querySelector("#wrong-letters");

/** @type {SVGLineElement} */
const figures = document.querySelectorAll(".figure-part");

const words = ["abc", "def"];

// 游戏变量
let word = "";
let isGaming = true;
const correctWords = [];

function fetchRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// 监控单词输入
window.addEventListener("keydown", (e) => {
  if (e.key.length === 1 && /[A-Za-z]/.test(e.key)) {
    console.log("yes");
  } else {
    console.log(e.key);
  }
});

// 更新单词
function updateWord(letter) {
  if (!isGaming && !word) return;
  if (correctWords.includes(letter)) {
    return showNotification("you");
  }
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
    }
  }
}

function init() {
  // 目前没用的错误处理
  try {
    word = fetchRandomWord();
  } catch (err) {
    console.log(err);
  }
}

// 初始化
init();

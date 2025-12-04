const words = [
  'apple',
  'banana',
  'orange',
  'grape',
  'peach',
  'melon',
  'lemon',
  'cherry',
  'pear',
  'plum',
  'kiwi',
  'mango',
  'berry',
  'coconut',
  'fig',
  'date',
]

const GAME_TIME = 60
let score = 0
let timeLeft = GAME_TIME
let currentWord = ''
let timer = null
let isRuning = false

const scoreEl = document.querySelector('#score')
const timerEl = document.querySelector('#timer')
const wordDisplayEl = document.querySelector('#word-display')
const inputBoxEl = document.querySelector('#input-box')
const startBtnEl = document.querySelector('#start-btn')
const gameOverEl = document.querySelector('#game-over')

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function startGame() {
  score = 0
  timeLeft = GAME_TIME
  isRuning = true
  inputBoxEl.value = ''
  inputBoxEl.disabled = false
  inputBoxEl.focus()
  gameOverEl.classList.add('hidden')
  startBtnEl.disabled = true
  updateScore()
  updateTimer()
  nextWord()
  timer = setInterval(() => {
    timeLeft--
    updateTimer()
    if (timeLeft <= 0) {
      endGame()
    }
  }, 1000)
}

function endGame() {
  isRuning = false
  clearInterval(timer)
  inputBoxEl.disabled = true
  startBtnEl.disabled = false
  gameOverEl.textContent = `Game Over! Your score: ${score}`
  gameOverEl.classList.remove('hidden')
}

function nextWord() {
  currentWord = getRandomWord()
  wordDisplayEl.textContent = currentWord
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`
}

function updateTimer() {
  timerEl.textContent = `Left time: ${timeLeft}`
}

inputBoxEl.addEventListener('input', () => {
  if (!isRuning) return
  if (inputBoxEl.value.trim() === currentWord) {
    score++
    updateScore()
    nextWord()
    inputBoxEl.value = ''
  }
})

startBtnEl.addEventListener('click', startGame)

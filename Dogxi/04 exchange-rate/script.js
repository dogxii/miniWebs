/** @type {HTMLSelectElement} */
const fromCurrency = document.querySelector("#from-currency");

/** @type {HTMLInputElement} */
const fromAmount = document.querySelector("#from-amount");

/** @type {HTMLSelectElement} */
const toCurrency = document.querySelector("#to-currency");

/** @type {HTMLInputElement} */
const toAmount = document.querySelector("#to-amount");

/** @type {HTMLButtonElement} */
const swapBtn = document.querySelector("#swap");

/** @type {HTMLSpanElement} */
const rateSpan = document.querySelector("#rate");

// 缓存汇率
let ratesData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 3600000;

// 请求及缓存汇率
async function fetchRates() {
  const now = Date.now();
  if (!ratesData || now - lastFetchTime > CACHE_DURATION) {
    try {
      const response = await fetch(
        "https://open.exchangerate-api.com/v6/latest",
      );
      ratesData = await response.json();
      lastFetchTime = now;
    } catch (error) {
      console.error("获取汇率出错: ", error);
      throw error;
    }
  }
  return ratesData;
}

// 计算汇率
async function calculate() {
  try {
    const currency_one = fromCurrency.value;
    const currency_two = toCurrency.value;

    rateSpan.innerText = "caculate...";

    const data = await fetchRates();

    const rate = data.rates[currency_two] / data.rates[currency_one];
    rateSpan.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
    toAmount.value = (fromAmount.value * rate).toFixed(2);
  } catch (error) {
    rateSpan.innerText = "获取汇率失败";
    console.error("获取汇率出错: ", error);
  }
}

fromCurrency.addEventListener("change", calculate);
toCurrency.addEventListener("change", calculate);

// 防抖函数
function debounce(func, delay = 250) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debounceCalculate = debounce(calculate);

fromAmount.addEventListener("input", debounceCalculate);

// 交换货币
function swapCurrency() {
  [fromCurrency.value, toCurrency.value] = [
    toCurrency.value,
    fromCurrency.value,
  ];
  calculate();
}

swapBtn.addEventListener("click", swapCurrency);

// 初始化
function start() {
  calculate();
}

start();

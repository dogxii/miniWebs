/** @type {HTMLSpanElement} */
const incomeEl = document.querySelector("#income");
/** @type {HTMLSpanElement} */
const expenseEl = document.querySelector("#expense");
/** @type {HTMLSpanElement} */
const currentBalanceEL = document.querySelector("#current-balance");
/** @type {HTMLUListElement} */
const transactionListEl = document.querySelector("#transaction-list");
// 表单元素
/** @type {HTMLInputElement} */
const textEl = document.querySelector("#text");
/** @type {HTMLInputElement} */
const amoutEl = document.querySelector("#amount");
/** @type {HTMLButtonElement} */
const submitBtn = document.querySelector("#submit");

// 初始变量
let balance = {
  income: 0,
  expense: 0,
};

let history = [
  // {id: 1, type: "income", amount: "10", text:"收入"}
];

function getNextId() {
  if (history.length === 0) {
    return 1;
  }
  return history[history.length - 1].id + 1;
}

submitBtn.addEventListener("click", addNewTransaction);

function addNewTransaction(e) {
  e.preventDefault();

  if (!textEl.value || !amoutEl.value) {
    return alert("Please input content!");
  }

  if (amoutEl.value === "0") {
    return alert("Can't input 0!");
  }

  const id = getNextId();
  const type = amoutEl.value > 0 ? "income" : "expense";
  const amout = Math.abs(amoutEl.value);
  const text = textEl.value;
  const transaction = {
    id,
    type,
    amout,
    text,
  };
  history.push(transaction);
  createTranscationDom(transaction);

  updateBalance();
}

function createTranscationDom(transaction) {
  const li = document.createElement("li");

  li.setAttribute("data-transaction-id", transaction.id);
  li.className = transaction.type === "income" ? "income-li" : "expense-li";
  li.innerHTML = `<span class="text">${transaction.text}</span><span class="amount">${transaction.type === "income" ? "+" : "-"}${transaction.amout}</span>`;

  li.addEventListener("click", deleteTransaction);

  transactionListEl.appendChild(li);
}

function deleteTransaction(e) {
  const id = e.target.dataset.transactionId;
  history = history.filter((trans) => trans.id != id);

  e.target.remove();

  updateBalance();
}

function updateBalance() {
  let income = 0;
  let expense = 0;
  history.forEach((item) => {
    if (item.type === "income") {
      income += item.amout;
    } else {
      expense += item.amout;
    }
  });

  balance = {
    income,
    expense,
  };

  incomeEl.innerText = `$${income.toFixed(2)}`;
  expenseEl.innerText = `$${expense.toFixed(2)}`;

  currentBalanceEL.innerText = `$${(income - expense).toFixed(2)}`;
}

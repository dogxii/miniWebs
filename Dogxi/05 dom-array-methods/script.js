/** @type {HTMLButtonElement} */
const addUserBtn = document.querySelector("#add-user");

/** @type {HTMLButtonElement} */
const doubleBtn = document.querySelector("#double-money");

/** @type {HTMLButtonElement} */
const onlyRichBtn = document.querySelector("#only-rich");

/** @type {HTMLButtonElement} */
const sortBtn = document.querySelector("#sort");

/** @type {HTMLButtonElement} */
const totalBtn = document.querySelector("#total");

/** @type {HTMLUListElement} */
const usersUList = document.querySelector("#users");

let usersArray = [];

// 添加随机用户

async function addRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100),
  };

  usersArray.push(newUser);
  updateDOM();
}

addUserBtn.addEventListener("click", addRandomUser);

// 更新数组DOM
function updateDOM() {
  let result = "";
  usersArray.forEach((user) => {
    result += `<li class="user"><strong>${user.name}</strong> 💰 ${user.money}</li>`;
  });
  usersUList.innerHTML = result;
}

// 双倍金钱
function doubleMoney() {
  usersArray = usersArray.map((user) => ({
    ...user,
    money: user.money * 2,
  }));
  updateDOM();
}

doubleBtn.addEventListener("click", doubleMoney);

// 展示💰50+
function showOnlyRich() {
  usersArray = usersArray.filter((user) => user.money > 50);
  updateDOM();
}

onlyRichBtn.addEventListener("click", showOnlyRich);

// 按照财富排序
function sortByRichest() {
  usersArray.sort((a, b) => b.money - a.money);
  updateDOM();
}

sortBtn.addEventListener("click", sortByRichest);

// 计算总金额
function calculateTotal() {
  const total = usersArray.reduce((acc, user) => acc + user.money, 0);
  usersUList.innerHTML += `<li class="user" style="color:red"><strong>Total</strong>💰 ${total}</li>`;
}

totalBtn.addEventListener("click", calculateTotal);

// 初始化
addRandomUser();
addRandomUser();
addRandomUser();

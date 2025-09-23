const seatingArea = document.querySelector(".seating-area");

/** @type {HTMLSelectElement} */
const movieSelect = document.querySelector("#movie");

let ticket = movieSelect.value;
console.log(ticket);
let total = 0;

movieSelect.addEventListener("change", (e) => {
  ticket = movieSelect.value;
  setTotal();
});

const outputCount = document.querySelector("#count");
const outputTotal = document.querySelector("#total");

let count = 0;

seatingArea.addEventListener("click", (e) => {
  /** @type {HTMLSpanElement} */
  const seat = e.target;
  if (seat.classList.contains("selected")) {
    seat.className = "seat";
    count--;
    setCount();
    setTotal();
  } else if (seat.className === "seat") {
    seat.classList.add("selected");
    count++;
    setCount();
    setTotal();
  }
});

function setCount() {
  outputCount.textContent = count;
}

function setTotal() {
  total = ticket * count;
  outputTotal.textContent = total;
}

// 没有localStorage存储 没有init

const seatingArea = document.querySelector(".seating-area");
const outputCount = document.querySelector("#count");

let count = 0;

seatingArea.addEventListener("click", (e) => {
  /** @type {HTMLSpanElement} */
  const seat = e.target;
  if (seat.classList.contains("selected")) {
    seat.className = "seat";
    count--;
    setCount();
  } else if (seat.className === "seat") {
    seat.classList.add("selected");
    count++;
    setCount();
  }
});

function setCount() {
  outputCount.textContent = count;
}

// wait

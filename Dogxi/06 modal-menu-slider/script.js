const modal = document.querySelector(".modal-container");

const signBtn = document.querySelector("#signBtn");

const closeBtn = document.querySelector("#closeBtn");

const toggle = document.querySelector("#toggle");

function toggleNavBar() {
  if (document.body.classList.contains("show-nav")) {
    document.body.classList.remove("show-nav");
  } else {
    document.body.classList.add("show-nav");
  }
}

toggle.addEventListener("click", toggleNavBar);

signBtn.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});

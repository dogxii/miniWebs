/** @type {HTMLDivElement} */
const articleListEl = document.querySelector("#article-list");

/** @type {HTMLInputElement} */
const searchEl = document.querySelector("#search");

/** @type {HTMLDivElement} */
const loadingEl = document.querySelector("#loading");

/** @type {HTMLDivElement} */
const errorEl = document.querySelector("#error-container");

/** @type {HTMLDivElement} */
const noResultEl = document.querySelector("#no-result");

/** @type {HTMLDivElement} */
const sentinelEl = document.querySelector("#sentinel");

const LIMIT = 5;
let page = 1;
let isLoading = false;
let searchDebounceTimer = null; // 输入防抖

function showLoading(show = true) {
  if (show) {
    loadingEl.style.display = "flex";
  } else {
    loadingEl.style.display = "none";
  }
}

function showError(show = true, err = "") {
  if (show) {
    errorEl.innerText = err;
    errorEl.style.display = "block";
  } else {
    errorEl.style.display = "none";
  }
}

// 筛选功能
function filterArticle(keyword) {
  const articleEls = articleListEl.children;
  const lowerKeyword = keyword.toLowerCase();

  let visibleCount = 0;
  for (const articleEl of articleEls) {
    const text = articleEl.innerText.toLowerCase();
    if (!keyword || text.includes(lowerKeyword)) {
      articleEl.style.display = "block";
      visibleCount++;
    } else {
      articleEl.style.display = "none";
    }
  }
  if (visibleCount === 0) {
    noResultEl.style.display = "block";
  } else {
    noResultEl.style.display = "none";
  }
}

// 从 API 获取文章
async function fetchArticles() {
  if (isLoading) return;

  isLoading = true;
  showLoading(true);

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`,
    );
    const data = await res.json();
    updateArticleDOM(data);
    page++;
  } catch (err) {
    showError(err);
  } finally {
    showLoading(false);
    showError(false);
    isLoading = false;
  }
}

// 更新文章 DOM
function updateArticleDOM(data) {
  data.forEach((article) => {
    const { id, title, body } = article;
    const articleEl = document.createElement("div");
    articleEl.classList.add("article");
    articleEl.innerHTML = `
      <span class="article-id">${id}</span>
      <span class="article-title">${title}</span>
      <p>${body}</p>`;
    articleListEl.insertBefore(articleEl, sentinelEl);
  });
}

// 输入筛选
searchEl.addEventListener("input", (e) => {
  const keyword = e.target.value.trim();

  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }

  searchDebounceTimer = setTimeout(() => {
    filterArticle(keyword);
  }, 300);
});

let scrollDebounceTimer = null;

// scroll 实现页面滚动加载
// window.addEventListener("scroll", () => {
//   if (scrollDebounceTimer) {
//     clearTimeout(scrollDebounceTimer);
//   }

//   scrollDebounceTimer = setTimeout(() => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//     if (scrollHeight - scrollTop <= clientHeight + 10) {
//       fetchArticles();
//     }
//   }, 300);
// });

// Intersection Observer API 实现滚动
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoading) {
        fetchArticles();
      }
    });
  },
  {
    rootMargin: "50px",
    threshold: 0,
  },
);

async function init() {
  await fetchArticles();

  // 先加载初始文章，再开始观察
  observer.observe(sentinelEl);
}

init();

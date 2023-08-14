// const url = "https://rickandmortyapi.com/api/character/";

// const container = document.querySelector(".js-list");
// console.log(container);
// const loadMore = document.querySelector(".js-load-more");
// let pages = 40;

// loadMore.addEventListener("click", onLoadMore);

// function servisCharacter(page = 1) {
//   return fetch(`${url}?page=${page}`).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }
// servisCharacter().then((data) => {
//   console.log(data);
//   container.insertAdjacentHTML("beforeend", createMarkup(data.results));
//   if (data.info.pages > 1) {
//     loadMore.hidden = false;
//   }
// });

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ image, name }) =>
//         `<li><img src="${image}" width = "200" alt = "${name}"><h2>${name}</h2></li>`
//     )
//     .join("");
// }

// function onLoadMore() {
//   pages += 1;
//   servisCharacter(pages).then((data) => {
//     console.log(data);
//     container.insertAdjacentHTML("beforeend", createMarkup(data.results));
//     if (data.info.pages === pages) {
//       loadMore.hidden = true;
//     }
//   });
// }

//!  скрол

const url = "https://rickandmortyapi.com/api/character/";
const container = document.querySelector(".js-list");
let pages = 1;

const options = {
  root: null,
  rootMargin: "300px",
};
const observer = new IntersectionObserver(callback, options);
const guard = document.querySelector(".js-guard");
console.log(guard);

function servisCharacter(page = 1) {
  return fetch(`${url}?page=${page}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
function createMarkup(arr) {
  return arr
    .map(
      ({ image, name }) =>
        `<li><img src="${image}" width = "200" alt = "${name}"><h2>${name}</h2></li>`
    )
    .join("");
}
servisCharacter().then((data) => {
  container.insertAdjacentHTML("beforeend", createMarkup(data.results));
  if (data.info.pages > 1) {
    observer.observe(guard);
  }
});

function callback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry);
      pages += 1;
      servisCharacter(pages).then((data) => {
        container.insertAdjacentHTML("beforeend", createMarkup(data.results));
        if (data.info.pages === pages) {
          observer.unobserve(guard);
        }
      });
    }
  });
}

// axios.get(${url}?page=${page});

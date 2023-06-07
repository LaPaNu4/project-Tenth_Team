import Notiflix from 'notiflix';
import { pagination } from './pagination.js';
import { getTopFilmsData, getFilmsData } from './catalog-api.js';

const catalogList = document.getElementById('catalog-list');
const searchForm = document.getElementById('search-form');

let totalEl = 0;
let page = 1;

// -----------------------------------------------------

onCatalogPageLoad(page);

setTimeout(() => {
  pagination.reset(totalEl);
}, 500);

pagination.on('afterMove', event => {
  const currentPage = event.page;
  onCatalogPageLoad(currentPage);
});

searchForm.addEventListener('submit', onSubmit);

// -------------------- Функция сабмита формы

function onSubmit(event) {
  event.preventDefault();
  const searchQuery = searchForm.searchQuery.value.trim();
  let page = 1;

  makeFilmMarkup(page, searchQuery);

  setTimeout(() => {
    pagination.reset(totalEl);
  }, 500);

  pagination.on('afterMove', event => {
    page = event.page;
    makeFilmMarkup(page, searchQuery);
  });
}

// -------------------- Функция загрузки ТОП фильмов

async function onCatalogPageLoad(page) {
  const response = await getTopFilmsData(page);
  const markup = await createTopFilmsMarkup(response);
  renderTopFilmsMarkup(markup);
}

// -------------------- Функция поиска фильмов

async function makeFilmMarkup(page, request) {
  const response = await getFilmsData(page, request);
  const markup = await createTopFilmsMarkup(response);
  renderTopFilmsMarkup(markup);
  clearSearchForm();
}

// -------------------- Функция создания разметки

function createTopFilmsMarkup(response) {
  const results = response.data.results;
  totalEl = response.data.total_results;

  if (results.length == 0) {
    const markup =
      '<div class="no-films-message"><p>OOPS...</p><p>We are very sorry!</p><p>We don’t have any results matching your search.</p><div>';
    return markup;
  }

  const markup = results
    .map(result => {
      let releaseDate = result.release_date;
      if (!result.release_date) {
        releaseDate = 'Coming soon';
      } else releaseDate = releaseDate.slice(0, 4);

      let filmName = result.original_title;
      if (!filmName) {
        filmName = 'Coming soon';
      }

      if (!result.poster_path) {
        return `<li class="catalog-item" data-catalog-item id="${result.id}">
            <div class="photo-card">
              <div class="image-wrap">
                <img src="https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg" alt="${result.title}" />
              </div>
              <div class="film-info">
                <p class="catalog-film-title">${filmName}</p>
                <div class="info-wrap">
                  <p class="info-item">"jenre"</p>
                  <p class="info-item">|</p>
                  <p class="info-item">${releaseDate}</p>
                </div>
              </div>
            </div>
        </li>`;
      } else {
        return `<li class="catalog-item" data-catalog-item id="${result.id}">
            <div class="photo-card">
              <div class="image-wrap">
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}" />
              </div>
              <div class="film-info">
                <p class="catalog-film-title">${filmName}</p>
                <div class="info-wrap">
                  <p class="info-item">"jenre"</p>
                  <p class="info-item">|</p>
                  <p class="info-item">${releaseDate}</p>
                </div>
              </div>
            </div>
        </li>`;
      }
    })
    .join('');
  return markup;
}

// -------------------- Функция рендера разметки

function renderTopFilmsMarkup(markup) {
  catalogList.innerHTML = markup;
}

// -------------------- Функция очистки формы

function clearSearchForm() {
  searchForm.searchQuery.value = '';
}

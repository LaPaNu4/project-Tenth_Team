import Notiflix from 'notiflix';
import axios from 'axios';
import { pagination } from './pagination.js';
import {
  getTopFilmsData,
  getFilmsData,
  getFilmByID,
  getGenres,
} from './catalog-api.js';

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
  getRating();
}

// -------------------- Функция поиска фильмов

async function makeFilmMarkup(page, request) {
  const response = await getFilmsData(page, request);
  const markup = await createTopFilmsMarkup(response);
  renderTopFilmsMarkup(markup);
  getRating();

  clearSearchForm();
}

// -------------------- Функция создания разметки

function createTopFilmsMarkup(response) {
  const results = response.data.results;

  if (response.data.total_results > 10000) {
    totalEl = 10000;
  } else {
    totalEl = response.data.total_results;
  }

  if (results.length == 0) {
    const markup =
      '<div class="no-films-message"><p>OOPS...</p><p>We are very sorry!</p><p>We don’t have any results matching your search.</p><div>';
    return markup;
  }

  const markup = results
    .map(result => {
      // --------------- рейтинг
      const rating = result.vote_average;
      let filmrating = '';
      if (!rating) {
        filmrating = 0;
      } else filmrating = `${Math.round(rating) * 10}%`;

      // --------------- дата
      let releaseDate = result.release_date;
      if (!result.release_date) {
        releaseDate = 'Coming soon';
      } else releaseDate = releaseDate.slice(0, 4);

      // --------------- название
      let filmName = result.original_title;
      if (!filmName) {
        filmName = 'Coming soon';
      }

      // --------------- жанры

      // const filmID = result.id;
      // const genresMarkup = bbb(filmID);
      // console.log(genresMarkup);

      if (!result.poster_path) {
        return `<li class="catalog-item" data-catalog-item id="${result.id}">
            <div class="photo-card">
              <div class="image-wrap">
                <img src="https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg" alt="${result.title}" />
              </div>
              <div class="film-info">
                <p class="catalog-film-title">${filmName}</p>
                <div class="info-wrap">
                  <p class="info-item jenres-list"></p>
                  <p class="info-item">|</p>
                  <p class="info-item">${releaseDate}</p>
                </div>
              </div>
            </div>
            <div class="catalog-rating-body">
                    <div class="catalog-rating-active" style="width: ${filmrating};"></div>
                    <div class="catalog-rating-items">
                        <input type="radio" aria-label="1 stars" class="catalog-rating-item" value="1" name="rating">
                        <input type="radio" aria-label="2 stars" class="catalog-rating-item" value="2" name="rating">
                        <input type="radio" aria-label="3 stars" class="catalog-rating-item" value="3" name="rating">
                        <input type="radio" aria-label="4 stars" class="catalog-rating-item" value="4" name="rating">
                        <input type="radio" aria-label="5 stars" class="catalog-rating-item" value="5" name="rating">
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
                  <p class="info-item jenres-list"></p>
                  <p class="info-item">|</p>
                  <p class="info-item">${releaseDate}</p>
                </div>
              </div>
            </div>
            <div class="catalog-rating-body">
                    <div class="catalog-rating-active" style="width: ${filmrating};"></div>
                    <div class="catalog-rating-items">
                        <input type="radio" aria-label="1 stars" class="catalog-rating-item" value="1" name="rating">
                        <input type="radio" aria-label="2 stars" class="catalog-rating-item" value="2" name="rating">
                        <input type="radio" aria-label="3 stars" class="catalog-rating-item" value="3" name="rating">
                        <input type="radio" aria-label="4 stars" class="catalog-rating-item" value="4" name="rating">
                        <input type="radio" aria-label="5 stars" class="catalog-rating-item" value="5" name="rating">
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

// -------------------- Функция получения рейтинга

async function getRating() {
  const filmsOnPage = document.querySelectorAll('.catalog-item');
  filmsOnPage.forEach(element => {
    const filmID = element.id;
    const jenresMarkup =
      element.firstElementChild.lastElementChild.lastElementChild
        .firstElementChild;

    bbb(filmID).then(text => {
      if (!text) {
        jenresMarkup.textContent = 'Coming soon';
      } else {
        jenresMarkup.textContent = text;
      }
    });
  });
}


async function bbb(filmID) {
  try {
    const filmData = await getFilmByID(filmID);
    const genres = [];
    if (!filmData) {
      return;
    } else {
      const jenresList = await renderJenresMarkup(filmData);

      addFirstTwoNames(jenresList, genres);
    }
    const jenresMarkupText = genres.join(', ');
    return jenresMarkupText;
  } catch (error) {
    console.log(error.message);
    // Notiflix.Notify.warning('OOPS... SOMETHING WENT WRONG');
  }
}

function renderJenresMarkup(data) {
  return data.genres;
}

function addFirstTwoNames(arr, genres) {
  for (let i = 0; i < 2 && i < arr.length; i++) {
    if (arr[i].name == 'Science Fiction') {
      genres.push('Sci-fi');
    } else {
      genres.push(arr[i].name);
    }
  }
}

// async function convertJenres(genreID, filmGenres) {
//   const genresList = await getGenres();
//   const qwe = genresList.find(genre => genre.id === genreID);
//   const genreName = qwe.name;
//   console.log(genreName);
//   filmGenres.push(genreName);
// }

// function dafdf(resultIDS, filmGenres) {
//   resultIDS.map(id => {
//     convertJenres(id, filmGenres);
//   });
// }

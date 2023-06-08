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
                  <p class="info-item jenres-list"></p>
                  <p class="info-item">|</p>
                  <p class="info-item">${releaseDate}</p>
                </div>
              </div>
            </div>
            <div class="catalog-rating-body is-hidden">
                    <div class="catalog-rating-active"></div>
                    <div class="catalog-rating-items">
                        <input type="radio" class="catalog-rating-item" value="1" name="rating">
                        <input type="radio" class="catalog-rating-item" value="2" name="rating">
                        <input type="radio" class="catalog-rating-item" value="3" name="rating">
                        <input type="radio" class="catalog-rating-item" value="4" name="rating">
                        <input type="radio" class="catalog-rating-item" value="5" name="rating">
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
            <div class="catalog-rating-body is-hidden">
                    <div class="catalog-rating-active"></div>
                    <div class="catalog-rating-items">
                        <input type="radio" class="catalog-rating-item" value="1" name="rating">
                        <input type="radio" class="catalog-rating-item" value="2" name="rating">
                        <input type="radio" class="catalog-rating-item" value="3" name="rating">
                        <input type="radio" class="catalog-rating-item" value="4" name="rating">
                        <input type="radio" class="catalog-rating-item" value="5" name="rating">
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
    const ratingMarkup = element.lastElementChild;
    const jenresMarkup =
      element.firstElementChild.lastElementChild.lastElementChild
        .firstElementChild;
    const markupToFill = ratingMarkup.firstElementChild;

    zzz(filmID).then(rating => {
      markupToFill.style.width = `${Math.round(rating) * 10}%`;
    });

    bbb(filmID).then(text => {
      if (!text) {
        jenresMarkup.textContent = 'Coming soon';
      } else {
        jenresMarkup.textContent = text;
      }
    });

    ratingMarkup.classList.remove('is-hidden');
  });
}

async function zzz(filmID) {
  try {
    const filmData = await getFilmByID(filmID);

    if (!filmData) {
      return;
    } else {
      const filmRating = await renderRatingMarkup(filmData);
      return filmRating;
    }
  } catch (error) {
    console.log(error.message);
  }
}

function renderRatingMarkup(data) {
  const rating = data.vote_average;
  return rating;
}

async function bbb(filmID) {
  try {
    const filmData = await getFilmByID(filmID);
    const genres = [];
    if (!filmData) {
      return;
    } else {
      const jenresList = await renderJenresMarkup(filmData);
      console.log(jenresList);

      addFirstTwoNames(jenresList, genres);
      // jenresList.map(result => {
      //   genres.push(result.name);
      // });
    }
    const jenresMarkupText = genres.join(', ');
    return jenresMarkupText;
  } catch (error) {
    console.log(error.message);
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

// getGenres();

// async function xxx(id) {
//   const API_URL = 'https://api.themoviedb.org/3/';
//   const API_KEY = 'api_key=d30846261444a5a49dd702fa51e06838';
//   const response = await axios.get(
//       `${API_URL}genre/movie/list?${API_KEY}&language=en-US`
//   );
//   const jenresList = response.data.genres;

//   jenresList.find((id) => {
//     console.log(id.name)
//   });

// }

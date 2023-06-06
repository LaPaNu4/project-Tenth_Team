import axios from 'axios';
import Notiflix from 'notiflix';
// import { pagination } from './pagination.js';
import Pagination from 'tui-pagination';

let totalEl = 0;
let page = 1;
// console.log(page);

const options = {
  totalItems: totalEl,
  itemsPerPage: 20,
  visiblePages: 3,
  page: page,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">...</a>',
  },
};

const pagination = new Pagination('pagination', options);

const URL = 'https://api.themoviedb.org/3/';
// 'https://api.themoviedb.org/3/trending/all/week?api_key=d30846261444a5a49dd702fa51e06838';
const KEY = 'api_key=d30846261444a5a49dd702fa51e06838';

const catalogList = document.getElementById('catalog-list');
const searchForm = document.getElementById('search-form');

getTopFilmsData(page).then(createTopFilmsMarkup).then(renderTopFilmsMarkup);

setTimeout(() => {
  pagination.reset(totalEl);
}, 500);

async function getTopFilmsData(page) {
  const response = await axios.get(
    `${URL}trending/all/week?${KEY}&language=en-US&page=${page}`
  );

  totalEl = response.data.total_results;

  const results = response.data.results;
  console.log(results);
  return results;
}

pagination.on('afterMove', event => {
  const currentPage = event.page;

  getTopFilmsData(currentPage)
    .then(createTopFilmsMarkup)
    .then(renderTopFilmsMarkup);
});

// getTopFilmsData().then(createTopFilmsMarkup).then(renderTopFilmsMarkup);

function createTopFilmsMarkup(results) {
  if (results.length == 0) {
    console.log('qweqwwe');
    const markup =
      '<span>OOPS... We are very sorry! We don’t have any results matching your search.</span>';
    return markup;
  }

  const markup = results
    .map(result => {
      let releaseDate = result.release_date;
      if (!result.release_date) {
        releaseDate = 'Unknown';
      } else releaseDate = releaseDate.slice(0, 4);

      let filmName = result.original_title;
      if (!filmName) {
        filmName = 'Unknown';
      }

      if (!result.poster_path) {
        console.log('dsadsadsad');
        return `<li class="catalog-item" data-catalog-item id="${result.id}">
            <div class="photo-card">
              <div class="image-wrap">
                <img src="https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg" alt="${result.title}" />
              </div>
              <div class="film-info">
                <p class="catalog-film-title">${filmName}</p>
                <div class="info">
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
                <div class="info">
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

function renderTopFilmsMarkup(markup) {
  catalogList.innerHTML = markup;
}

async function getFilmsData(page, request) {
  const response = await axios.get(
    `${URL}search/movie?${KEY}&query=${request}&page=${page}`
  );
  const results = response.data.results;
  totalEl = response.data.total_results;
  console.log(results);

  return results;
}

searchForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const searchQuery = searchForm.searchQuery.value.trim();
  let page = 1;
  // console.log(page);

  getFilmsData(page, searchQuery)
    .then(createTopFilmsMarkup)
    .then(renderTopFilmsMarkup)
    .then(clearSearchForm);

  setTimeout(() => {
    pagination.reset(totalEl);
  }, 500);

  pagination.on('afterMove', event => {
    page = event.page;

    getFilmsData(page, searchQuery)
      .then(createTopFilmsMarkup)
      .then(renderTopFilmsMarkup)
      .then(clearSearchForm);
  });
}

function clearSearchForm() {
  searchForm.searchQuery.value = '';
}

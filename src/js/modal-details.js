
var _ = require('lodash');
// const imgEL = document.querySelector(".catalog-list");
const imgELs = document.querySelectorAll('[data-catalog-list]');
const modalEl = document.querySelector('.modal-backdrop');
const cardHeaderEl = document.querySelector('.film-card-content');
const closeBtnEl = document.querySelector('.film-card-close-btn')

imgELs.forEach(imgEL => {
  imgEL.addEventListener('click', _.throttle(onClickPoster, 100));
});
modalEl.addEventListener('click', onCloseModalBackdrop);
closeBtnEl.addEventListener("click", toggleModal);

let favoriteMovies = [];

function onClickPoster(event) {
  event.preventDefault();

 
  const currentMovie = event.target.closest('[data-catalog-item]');

  console.log(currentMovie);

  if (currentMovie) {
    const idOfMovie = currentMovie.getAttribute('id');
    console.log(idOfMovie);
    fetchMoreFilmDetails(idOfMovie)
      .then(data => {
        onOpenModalWindow(data);
        onMarkUpDetails(data);
                btnRemove(idOfMovie)

      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  }
  clearMarkup();
}

function fetchMoreFilmDetails(idOfMovie) {
  const API_KEY = 'b5be8a81b67f23805c0e9d62a063210c';
  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const query = `${BASE_URL}${idOfMovie}?api_key=${API_KEY}`;

  return fetch(query)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      // console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

function onOpenModalWindow(data) {
  modalEl.classList.remove('is-hidden');
  window.addEventListener('keydown', onPressESC);
}


function onCloseModal() {
  modalEl.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
  clearMarkup();
}

function clearMarkup() {
  cardHeaderEl.innerHTML = '';
}

function onCloseModalBackdrop(event) {
  if (event.target.classList.contains('modal-backdrop') || event.target.classList.contains('film-card-close-btn') ) {
    onCloseModal();
    clearMarkup();
  }
}


  function toggleModal() {
   modalEl.classList.toggle("is-hidden");
}
  
function onPressESC(e) {
  if (e.keyCode === 27) {
    onCloseModal();
  }
}

function onMarkUpDetails(data) {
  const popularity = data.popularity.toFixed(1);
  const genre = data.genres.map(genre => genre.name).join(', ');
  const original_title = data.original_title;
  // console.log(genre);
  // console.log(popularity);

  const markup = `<div class="film-card-poster" id="${data.id}">
    <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="John Wick poster" />
  </div>
  <div class="film-summary">
    <h2 class="film-title">${original_title}</h2>
    <ul class="film-info-list">
      <li class="film-info-list-item">
        <ul>
          <li class="film-vote">Vote / Votes </li>
          <li class="film-popularity">Popularity </li>
          <li class="film-genre">Genre</li>
        </ul>
      </li>
      <li class="film-info-list-item">
        <ul>
          <li>
            <span class="film-vote-text">${data.vote_average}</span> /
            <span class="film-votes-text">${data.vote_count}</span>
          </li>
          <li class="film-popularity-text">${popularity}</li>
          <li class="film-genre-text">${genre}</li>
        </ul>
      </li>
    </ul>
    <p class="film-about">About</p>
    <p class="film-text">
      ${data.overview}
    </p>
    <div class="film-card-btn-container">
      <button type="button" class="film-card-btn" data-btn-active>
        Add to my library
      </button>
    </div>
  </div>`;

  cardHeaderEl.insertAdjacentHTML('beforeend', markup);
}


function onAddLibrary(event) {
  const btn = event.target;
  console.log(btn.textContent.trim());
  console.log('кнопкаааа');

  let favoriteMovies = [];

  const storedMovies = localStorage.getItem('favoriteMovies');
if (storedMovies) {
  favoriteMovies = JSON.parse(storedMovies);
  const movieId = btn.closest('.film-card').querySelector('.film-card-poster').getAttribute('id');
  if (favoriteMovies.find(movie => movie.id === movieId)) {
    btn.textContent = 'Remove from library';
  }
}

 if (btn.textContent.trim() === 'Add to my library') {
    const movie = btn.closest('.film-card').querySelector('.film-card-poster');
    const movieId = movie.getAttribute('id');
    console.log(movieId);
    const movieObject = { id: movieId, start: '' };
    favoriteMovies.push(movieObject);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    btn.textContent = 'Remove from library';

    const updatedMovies = localStorage.getItem('favoriteMovies');
    if (updatedMovies) {
      favoriteMovies = JSON.parse(updatedMovies);
    }
  } else if (btn.textContent.trim() === 'Remove from library') {
    const movie = btn.closest('.film-card').querySelector('.film-card-poster');
    const movieId = movie.getAttribute('id');
    removeIdMovie(movieId);
    btn.textContent = 'Add to my library';

    const updatedMovies = localStorage.getItem('favoriteMovies');
    if (updatedMovies) {
      favoriteMovies = JSON.parse(updatedMovies);
    }
  }
}

function removeIdMovie(movieId) {
  const storedMovies = localStorage.getItem('favoriteMovies');
  const favoriteMovies = JSON.parse(storedMovies);

  const indexToRemove = favoriteMovies.findIndex(movie => movie.id === movieId);
  if (indexToRemove !== -1) {
    favoriteMovies.splice(indexToRemove, 1);
  }

  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}

cardHeaderEl.addEventListener('click', function (event) {
  if (event.target.classList.contains('film-card-btn')) {
    onAddLibrary(event);
  }
});

function btnRemove(idOfMovie) {
  const btn = document.querySelector('.film-card-btn');
  const storedMovies = localStorage.getItem('favoriteMovies');
  if (storedMovies) {
    const favoriteMovies = JSON.parse(storedMovies);
    const currentMovieId = favoriteMovies.map(movie => movie.id.toString());
    if (currentMovieId.includes(idOfMovie) && btn.textContent.trim() !== 'Remove from library') {
      btn.textContent = 'Remove from library';
    }
  }
}
  


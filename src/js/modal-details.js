var _ = require('lodash');
const imgEL = document.querySelector(".catalog-list");
const bodyEl = document.querySelector('body');
const modalEl = document.querySelector('.modal-backdrop');
const cardHeaderEl = document.querySelector('.film-card-header')
const modalBtnEl = document.querySelector('.film-card-btn')

imgEL.addEventListener("click", _.throttle(onClickPoster, 100));
modalEl.addEventListener('click', onCloseModalBackdrop);
modalBtnEl.addEventListener('click', onAddLibrary);

function onClickPoster(event) {
  event.preventDefault();
  const currentMovie = event.target.closest('.catalog-item');

  console.log(currentMovie);

  if (currentMovie) {
    const idOfMovie = currentMovie.getAttribute('id');
    console.log(idOfMovie);
    fetchMoreFilmDetails(idOfMovie)
      .then(data => {
        console.log(data.original_title);
        onOpenModalWindow(data);
        onMarkUpDetails(data);
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  }
  clearMarkup()
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
      console.log(data);
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

function onPressESC(e) {
  if (e.keyCode === 27) {
    onCloseModal();
  }
}

function onMarkUpDetails(data) {
  const popularity = data.popularity.toFixed(1);
  const genre = data.genres.map(genre => genre.name).join(', ');
  const original_title = data.original_title;
  console.log(genre);
  console.log(popularity);

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
  </div>`;

  cardHeaderEl.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  cardHeaderEl.innerHTML = '';
}

function onCloseModalBackdrop(event) {
  if (event.target.classList.contains('modal-backdrop')) {
    clearMarkup();
    onCloseModal();
  }
}




function onAddLibrary(event) {
  const btn = event.target;
  const btnActiveValue = btn.textContent;
  console.log(btnActiveValue);

  let favoriteMovies = [];

  const storedMovies = localStorage.getItem('favoriteMovies');
  if (storedMovies) {
    favoriteMovies = JSON.parse(storedMovies);
  }

  if (btnActiveValue === 'Add to my library'|| favoriteMovies === '') {
    const movie = document.querySelector('.film-card-poster');
    const movieId = movie.getAttribute('id');

    favoriteMovies.push(movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    btn.textContent = 'Remove from library';
   
  }

  if (btnActiveValue === 'Remove from library') {
 const movie = document.querySelector('.film-card-poster');
    const movieId = movie.getAttribute('id');
    removeIdMovie(movieId, storedMovies)
  }

  console.log(favoriteMovies);
}


function removeIdMovie(movieId, storedMovies) {
  const favoriteMovies = JSON.parse(storedMovies);

  if (favoriteMovies.includes(movieId)) {
    const indexToRemove = favoriteMovies.indexOf(movieId);
    if (indexToRemove !== -1) {
      favoriteMovies.splice(indexToRemove, 1);
    }
  }
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  modalBtnEl.textContent = 'Add to library'

}




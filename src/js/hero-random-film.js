import axios from 'axios';
import {addRating} from './rating'

const sectionHero = document.querySelector('.hero-section');
const containerDefault = document.querySelector('.hero-default');
const containerRender = document.querySelector('.hero-random');
const watchBtn = document.querySelector('.hero-watch');
const moreDetailsBtn = document.querySelector('.hero-info');
const closeBtn = document.querySelector('.popup-close');
const popupContainer = document.querySelector('.popup');
const popupDefault = document.querySelector('.popup-content-default');
const popupRender = document.querySelector('.popup-content-render');
const API_KEY = 'b2a327199ab710c06f4180e085359e4a';
const URL_DAY = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
let rating = '';
let ID_T = null;

document.addEventListener('DOMContentLoaded', renderFilmDay);
watchBtn.addEventListener('click', onWatchBtnClick);
closeBtn.addEventListener('click', onCloseBtnClick);

async function renderFilmDay() {
  try {
    const filmsArr = await getFilmsDay(URL_DAY);
    if (!filmsArr || filmsArr.length === 0) throw new Error('No data!');

    const filmOfDay = await randomFilmFind(filmsArr);
      createRandomFilm(filmOfDay);
      addRating(rating)
    document.removeEventListener('DOMContentLoaded', renderFilmDay);
  } catch (err) {
    onError(err);
  }
}

function onWatchBtnClick(e) {
  renderTrailer(ID_T);
}

async function renderTrailer(ID) {
  try {
    const filmTrailerArr = await getTrailer(ID);
    const trailer = filmTrailerArr.find(e => e.name === 'Official Trailer');
    const {key} = trailer;    
    if (!key || filmTrailerArr.length === 0) throw new Error('No data!');
    
    createTrailer(key);
    
    popupDefault.classList.add('hero-hidden');

    console.log(trailer);//for info
    console.log(key);//for info
  } catch (err) {
    onErrorTrailer(err);
  }
}

async function getFilmsDay(url) { 
  const response = await axios.get(url);
  const results = response.data.results;
  return results;
}

async function getTrailer(idTrailer) {
  const URL_TRAILER = `https://api.themoviedb.org/3/movie/${idTrailer}/videos?api_key=${API_KEY}&language=en-US`;
  const responseTrailer = await axios.get(URL_TRAILER);
  const resultsTrailer = responseTrailer.data.results;
  return resultsTrailer;  
}

function randomFilmFind(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomFilm = arr[randomIndex];
  console.log(randomFilm); // for info
  return randomFilm;
}

function createRandomFilm(filmObj) {
  const {
    backdrop_path,
    original_title,
    original_name,
    id,
    overview,
    vote_average,
  } = filmObj;

  const poster = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  rating = vote_average;
  console.log(rating);//for info
  moreDetailsBtn.setAttribute('id', `${id}`);
  ID_T = id;
    
  if (backdrop_path === undefined || backdrop_path === '') {
    poster = `./images/hero-img/coming-soon.jpg`;
  } else {
    sectionHero.classList.add('hero-section-random');
    containerRender.classList.remove('hero-hidden');

    containerRender.insertAdjacentHTML(
      'afterbegin',
      `
    <img src="${poster}" alt="best-film-day" class="hero-img-random"/>
    <h1 class="hero-title hero-title-random">${
      original_title || original_name
    }</h1>
    <div class="form_item">
            <div class="form_lebel"> </div>
            <div data-ajax="true" class="rating rating_set rating-hero">
                <div class="rating_body">
                    <div class="rating_active"></div>
                    <div class="rating_items">
                        <input type="radio" class="rating_item" value="1" name="rating">
                        <input type="radio" class="rating_item" value="2" name="rating">
                        <input type="radio" class="rating_item" value="3" name="rating">
                        <input type="radio" class="rating_item" value="4" name="rating">
                        <input type="radio" class="rating_item" value="5" name="rating">
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="rating_value"> 2.0 </div> -->
    <p class="hero-text hero-text-random">${overview}</p>
    
</div>`
    );    
  }
}

function createTrailer(keyTrailer) {  
  popupContainer.classList.remove('popup-hidden');
  popupRender.classList.remove('hero-hidden');

  const urlTrailer = `https://www.youtube.com/embed/${keyTrailer}`;

  popupRender.innerHTML = `<iframe class="popup-video" width="" height="" src="${urlTrailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
}


function onCloseBtnClick(e) {
  e.preventDefault();
  popupContainer.classList.add('popup-hidden');
  document.body.style.position = '';
  popupRender.innerHTML = "";
}

function onError(err) {
  console.error(err);
  containerDefault.classList.remove('hero-hidden');
}

function onErrorTrailer(err) {
  console.error(err);
  popupContainer.classList.remove('popup-hidden');
  document.body.style.position = 'fixed';
}



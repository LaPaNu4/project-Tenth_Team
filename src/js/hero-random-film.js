import axios from 'axios';
import {addRating} from './rating'
const sectionHero = document.querySelector('.hero-section');
const containerDefault = document.querySelector('.hero-default');
const containerRender = document.querySelector('.hero-random');
const watchBtn = document.querySelector('.hero-watch');
const closeBtn = document.querySelector('.popup-close');
const popupContainer = document.querySelector('.popup');
const popupDefault = document.querySelector('.popup-content-default');
const popupRender = document.querySelector('.popup-content-render');
const URL_DAY =
  'https://api.themoviedb.org/3/trending/all/day?api_key=b2a327199ab710c06f4180e085359e4a';
let rating = ''
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

async function getFilmsDay(url) {
  const response = await axios.get(url);
  const results = response.data.results;

  return results;
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
    video,
    popularity,
    overview,
    vote_average,
  } = filmObj;
  const poster = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    rating = vote_average
    console.log(rating)
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

    if (video === true) {
      popupDefault.classList.add('hero-hidden');
      popupRender.innerHTML = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=YOUR_KEY&language=en-US`;
    }
  }
}

function onError(err) {
  console.error(err);
  containerDefault.classList.remove('hero-hidden');
}

function onWatchBtnClick(e) {
  e.preventDefault();
  popupContainer.classList.remove('popup-hidden');
  document.body.style.position = 'fixed';
}

function onCloseBtnClick(e) {
  e.preventDefault();
  popupContainer.classList.add('popup-hidden');
  document.body.style.position = '';
}

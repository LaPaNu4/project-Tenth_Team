// weekly-trends
import axios from 'axios';
import Notiflix from 'notiflix';
import {addRating} from './rating'
import { add } from 'lodash';

const URL =
  'https://api.themoviedb.org/3/trending/movie/week?api_key=ee5376443abaeb243d053aa1ffc4ea05';
const IMG_BASE_URL = `https://image.tmdb.org/t/p`;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_W400 = `/w400`;
const API_KEY = 'ee5376443abaeb243d053aa1ffc4ea05';
const galleryList = document.querySelector('.gallery-weekly-list');
let rating = '';

function getTrendData() {
  const URL =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=ee5376443abaeb243d053aa1ffc4ea05';

  return axios.get(URL).then(data => {
    return data.data;
  });
}
async function getMovieGenres() {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return data;
}
export async function getGenres() {
  const genres = await getMovieGenres().then(({ genres }) => genres);

  return { genres };
}

function renderMarkup(results) {
  getGenres().then(({ genres }) => {
    if (results) {
      results.forEach(film => {
        const { genre_ids, release_date } = film;
        genres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1);
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          film.genre_names = genre_ids.join(', ');
          if (film.release_date) {
            film.release_date = release_date.slice(0, 4);
          }
        });
      });
      const markupList = createMarkup(results);
      if (galleryList) {
        galleryList.innerHTML = markupList;
      }
    }
  });
}
function createMarkup(results) {
  return results
    .slice(0, 3)
    .map(
      ({
        original_title,
        release_date,
        genre_ids,
        poster_path,
        vote_average,
        id,
      }) => {
        rating = vote_average;
        let posterIMG = ``;
        if (poster_path) {
          posterIMG = `${IMG_BASE_URL}${IMG_W400}${poster_path}`;
        } else {
          posterIMG = 'https://i.ibb.co/C0LFwTh/OIF.jpg';
        }

        let starIcons = '';
        for (let i = 1; i <= 5; i++) {
          let starClass = 'fa-star-o';
          if (i * 2 < vote_average) {
            starClass = 'fa-star';
          } else if (i * 2 - 1 < vote_average) {
            starClass = 'fa-star-half-o';
          }
          starIcons += `<span class="fa star ${starClass}"> </span>`;
        }

        // Calculate the width based on the rating value
        const width = Math.round(rating) * 10;

        return `<li class='gallery-weekly__list-elem hover-cursor' data-catalog-item id='${id}'>
          <img class='gallery-weekly__image' src="${posterIMG}" alt="${original_title}" loading="lazy" id='${id}'>
          <div class='gallery-weekly__all-info'>
            <div class="gallery-weekly__info">
              <h3 class= 'gallery-weekly__title'>${original_title}</h3>
              <div class='cards-list_second_line'>
                <div class='cards-list__text color-h'>
                  <p>${genre_ids} | ${release_date}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="form_item form_item_weekly">
            <div class="form_lebel"> </div>
            <div data-ajax="true" class="rating rating_weekly  rating_set rating-hero">
              <div class="rating_body">
                <div class="rating_active ${id}" style="width: ${width}%;"></div>
                <div class="rating_items">
                  <input type="radio" aria-label="1 stars" class="rating_item" value="1" name="rating">
                  <input type="radio" aria-label="2 stars" class="rating_item" value="2" name="rating">
                  <input type="radio" aria-label="3 stars" class="rating_item" value="3" name="rating">
                  <input type="radio" aria-label="4 stars" class="rating_item" value="4" name="rating">
                  <input type="radio" aria-label="5 stars" class="rating_item" value="5" name="rating">
                </div>
              </div>
            </div>
          </div>
        </li>`;
      }
    )
    .join('');
}
export const getWeeklyTrends = getTrendData().then(({ results }) => {
  return renderMarkup(results);
});

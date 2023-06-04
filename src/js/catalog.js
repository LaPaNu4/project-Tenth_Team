import axios from 'axios';
import Notiflix from 'notiflix';
const URL = 'https://api.themoviedb.org/3/';
// 'https://api.themoviedb.org/3/trending/all/week?api_key=d30846261444a5a49dd702fa51e06838';
const KEY = 'api_key=d30846261444a5a49dd702fa51e06838';

const catalogList = document.getElementById('catalog-list');
const searchForm = document.getElementById('search-form');

async function getTopFilmsData() {
  const response = await axios.get(
    `${URL}trending/all/week?${KEY}&language=en-US`
  );
  // console.log(response);
  const results = response.data.results;
  console.log(results);

  return results;
}

getTopFilmsData().then(createTopFilmsMarkup).then(renderTopFilmsMarkup);

function createTopFilmsMarkup(results) {
  if (!results) {
    return;
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

      // let aaaa = result.genre_ids.map(jenre =>
      //   getGenreName(jenre).then(value => {
      //     console.log(value);
      //     return value;
      //   })
      // );

      // console.log(aaaa);

      return `<li class="catalog-item" id="${result.id}">
            <div class="photo-card">
              <div class="image-wrap">
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}" />
              </div>
              <div class="film-info">
                <p class="film-title">${filmName}</p>
                <div class="info">
                  <p class="info-item">"value"</p>
                  <p class="info-item">|</p>
                  <p class="info-item">${releaseDate}</p>
                </div>
              </div>
            </div>
        </li>`;
    })
    .join('');
  return markup;
}

function renderTopFilmsMarkup(markup) {
  catalogList.innerHTML = markup;
}

async function getFilmsData(request) {
  const response = await axios.get(
    `${URL}search/movie?${KEY}&query=${request}`
  );
  const results = response.data.results;

  return results;
}

searchForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const searchQuery = searchForm.searchQuery.value.trim();
  getFilmsData(searchQuery)
    .then(createTopFilmsMarkup)
    .then(renderTopFilmsMarkup)
    .then(clearSearchForm);
}

function clearSearchForm() {
  searchForm.searchQuery.value = '';
}

// async function getGenreName(id) {
//   const response = await axios.get(
//     `https://api.themoviedb.org/3/genre/movie/list?api_key=249f222afb1002186f4d88b2b5418b55&language=en-US`
//   );
//   try {
//     const allGenres = response.data.genres;

//     const jenre = allGenres.find(jenre => jenre.id == id);
//     console.log(jenre.name);
//     return jenre.name;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

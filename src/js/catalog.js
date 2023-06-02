import axios from 'axios';
// import Notiflix from 'notiflix';
const URL =
  'https://api.themoviedb.org/3/trending/all/week?api_key=d30846261444a5a49dd702fa51e06838';

const catalogList = document.getElementById('catalog-list');

async function getTopFilmsDData() {
  const response = await axios.get(URL);
  const results = response.data.results;

  return results;
}

export default function renderDefaultCatalog() {
  getTopFilmsDData().then(createTopFilmsMarkup).then(renderTopFilmsMarkup);
}

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

      return `<li class="catalog-item">
            <div class="photo-card">
              <div class="image-wrap">
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}" />
              </div>
              <div class="film-info">
                <p class="film-title">${filmName}</p>
                <div class="info">
                  <p class="info-item">Drama</p>
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

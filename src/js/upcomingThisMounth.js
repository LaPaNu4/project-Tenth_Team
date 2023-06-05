
import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/movie/upcoming';
const API_KEY = '0b7ed72c0b07bc683ffc3b8a0e430792';

const upcomingFilm = document.querySelector('.upcoming-film');
const favoriteMovies = 'favoriteMovies';


async function getUpcomingData () {
    const response = await axios.get(`${URL}?api_key=${API_KEY}`);
    const result = response.data.results;

    return result
}


async function getUpcoming() {
    try {
        const data = await getUpcomingData();

      if (data.length === 0) {
        renderMarkupError();
        return;
      }

      const randomFilm = Math.floor(Math.random() * data.length);
        const renderFilm = data[randomFilm];
       const idFilm = renderFilm.id;
      const render = await createMarcup(renderFilm);
        renderMarkup(render);
        
        const upcomingBtn = document.querySelector('.upcoming_content_btn');  
        let savedLocal = localStorage.getItem('favoriteMovies');
        let parsedLocal = JSON.parse(savedLocal);
        parsedLocal = parsedLocal ? parsedLocal : [];   

      if (parsedLocal.includes(idFilm)) {
        upcomingBtn.textContent = 'Remove from my library';
      } else {
        upcomingBtn.textContent = 'Add to my library';
      }

        upcomingBtn.addEventListener('click', () => {
          
  let savedLocal = localStorage.getItem('favoriteMovies');
  let parsedLocal = JSON.parse(savedLocal);
  parsedLocal = parsedLocal ? parsedLocal : [];

  if (!parsedLocal.includes(idFilm)) {
    parsedLocal.push(idFilm);
    localStorage.setItem(favoriteMovies, JSON.stringify(parsedLocal));
    upcomingBtn.textContent = 'Remove from my library';
  } else {
    let index = parsedLocal.findIndex(id => id === idFilm);
    parsedLocal.splice(index, 1);
    localStorage.setItem(favoriteMovies, JSON.stringify(parsedLocal));
    upcomingBtn.textContent = 'Add to my library';
  }
      });
    
    
    } catch (error) {
      console.log(error);
    }
}

getUpcoming();

  

function createMarcup({
  backdrop_path,
  genre_ids,
  title,
  overview,
  vote_average,
  vote_count,
  release_date,
  popularity,
}) {

     return `
      <img
        class="upcoming_img"
        src="https://image.tmdb.org/t/p/original${backdrop_path}"
        alt="Poster ${title}"
       
      
      />

      <div class="upcoming_content">
        <h3 class="upcoming_name">${title}</h3>

        <div class="upcoming_thumb">
          <ul class="upcoming-list left">
            <li class="upcoming_list_item">
              <p class="upcoming_list_text">Release date</p>
              <p class="upcoming_list_date">${release_date}</p>
            </li>
            <li class="upcoming_list_item">
              <p class="upcoming_list_text">Vote / Votes</p>
              <p class="upcoming_list_vote">
                <span class="vote"> ${vote_average}</span> / <span class="vote">${vote_count}</span>
              </p>
            </li>
          </ul>

          <ul class="upcoming-list rigth">
            <li class="upcoming_list_item">
              <p class="upcoming_list_text">Popularity</p>
              <p class="upcoming_list_pop">${popularity.toFixed(1)}</p>
            </li>
            <li class="upcoming_list_item">
              <p class="upcoming_list_text">Genre</p>
              <p class="upcoming_list_genre">${genre_ids}</p>
            </li>
          </ul>
        </div>

        <h3 class="upcoming_content_title">About</h3>
        <p class="upcoming_content_text">${overview}
        </p>

  <button type="button" class="upcoming_content_btn" id="addLibrary">
  Add to my library
  </button>
`;
}

function renderMarkup(markup) {
  upcomingFilm.innerHTML = markup;
}




function renderMarkupError() {
  upcomingFilm.innerHTML = `<div class="upcoming-error-container">
        <p class="upcoming_error_container_text">
          OOPS...<br />
          We are very sorry!<br />
          But we couldn't find any upcoming movies this month.
        </p>
      </div>`;
}


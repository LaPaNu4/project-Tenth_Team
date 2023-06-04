import axios from 'axios';

const sectionHero = document.getElementById('hero-main-section');
const containerDefault = document.querySelector('.hero-default');
const container = document.querySelector('.hero-random');
const URL_DAY = 'https://api.themoviedb.org/3/trending/all/day?api_key=d30846261444a5a49dd702fa51e06838';

document.addEventListener("DOMContentLoaded", renderFilmDay);

function renderFilmDay() {
    try {

        getFilmsDay(URL_DAY).then(randomFilmFind).then(createRandomFilm);
    } catch (error) {
        console.log(error)
    }    
}

async function getFilmsDay(url) {
    const response = await axios.get(url);
    const results = response.data.results;
    console.log(results); //delete

    return results;
}

function randomFilmFind (arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomFilm = arr[randomIndex];
    console.log(randomFilm);

    return randomFilm;
}

function createRandomFilm(filmObj) {
    if (!filmObj) {
      return;
    }
    const{backdrop_path, original_title, original_name, popularity, overview} = filmObj;
    
    //containerDefault.classList.add('hero-hidden')

    sectionHero.classList.add('hero-section-random');
    
    container.innerHTML = `
    <img src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt="best-film-day" class="hero-img-random"/>
    <h1 class="hero-title hero-title-random">${original_title || original_name}</h1>
    <div class="form_item">
            <div class="form_lebel"> </div>
            <div data-ajax="true" class="rating rating_set">
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
    <div class="hero-random-btn">
        <button class="hero-btn" type="button" name="watch-trailer-btn">Watch trailer</button>
        <button class="hero-btn" type="button" name="more-details-btn">More details</button>
    </div>
</div>`
 };
          



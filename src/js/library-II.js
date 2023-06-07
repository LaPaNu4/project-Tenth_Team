
const gallery = document.querySelector('.movies-gallery');
const searchMore = document.querySelector('.search-more');
const loadMore = document.querySelector('.load');
const emptyGallery = document.querySelector('.empty-gallery');

const dropDown = document.querySelector('.dropdown-library');
const dropLibraryItem = document.querySelectorAll('.dropdown-item-library');
const dropMenuLibrary = document.querySelector('.dropdown-menu-library');



const STORAGE = 'favoriteMovies';
loadMore.classList.add('hide');
emptyGallery.classList.add('show');
dropDown.classList.add('hide');

const renderedMovies = [];

function fetchFromLibrary() {
    const movieIds = JSON.parse(localStorage.getItem(STORAGE));
    
    if(!movieIds || movieIds.length === 0) {
        emptyGallery.classList.remove('hide');
        emptyGallery.classList.add('show');
        return;
    }

    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    const API_KEY = '14b16a10583a3d9315723a356100e4ad';
    const fetchMovies = movieIds.map(movie => {
        return fetch(`${BASE_URL}${movie.id}?api_key=${API_KEY}`)
        .then(data => data.json());
    });

    Promise.all(fetchMovies)
        .then(movieData => {
            renderedMovies.push(...movieData);

            gallery.innerHTML = '';

            const moviesById = movieMarkUp(movieData);

            gallery.insertAdjacentHTML('beforeend', moviesById);
            emptyGallery.classList.add('hide');
            emptyGallery.classList.remove('show');
            loadMore.classList.add('show');
            loadMore.classList.remove('hide');
            dropDown.classList.add('show');
            dropDown.classList.remove('hide');
        })                    
        .catch(error => {
            console.log(error);
        });
    }    


    const filterMoviesByGenre = (e) => {
        const target = e.target;
        const genreSelected = target.dataset.filter; 
        console.log(genreSelected);
        console.log(renderedMovies);
   

        const chosenMovies = renderedMovies.filter(movie => {
            const movieGenres = movie.genres.map(genre => genre.name.toLowerCase());
            return movieGenres.includes(genreSelected.toLowerCase());
        });
        console.log(chosenMovies);

          
        if (chosenMovies.length > 0) {
        gallery.innerHTML = ''; 
        const galleryItems = movieMarkUp(chosenMovies);
        gallery.insertAdjacentHTML('beforeend', galleryItems);
        loadMore.classList.add('show');
        loadMore.classList.remove('hide');
        } else {
        gallery.innerHTML = `<h1 class="np_chosen">Sorry but there are no ${genreSelected} movies in your Library...</h1>`;
        loadMore.classList.add('hide');
        loadMore.classList.remove('show');
        }
  }


const movieMarkUp = (dataComing) => {
    return dataComing.map(item => {
        const { poster_path, original_title, release_date, popularity, id } = item;
        const genre = item.genres.map(genres => genres.name).slice(0, 2).join(', ');

        const year = item.release_date.slice(0, 4);
        const moviePoster = `https://image.tmdb.org/t/p/w500${poster_path}`;
        
        if(poster_path === undefined || poster_path === "") {
            moviePoster = `./images/hero-img/coming-soon.jpg`;
        }

        return `

        <li class="movie-item">
            <div class="movie" data-catalog-item id=${id}>
                <img class="movie-img" src=${moviePoster}>


                <div class="movie-info">
                    <div class="info">
                        <h2 class="movie-title">${original_title}</h2>
                        <div class="genre_year">
                            <h2 class="movie-genre">${genre}</h2>
                            <h2 class="movie-year">${year}</h2></div>
                        </div>
                    <div>
                        <span class="movie-rating"></span>
                    </div>
                </div>
            </div>
        </li>`;
    }).join('');
}

window.onload = fetchFromLibrary;

dropMenuLibrary.addEventListener('click', filterMoviesByGenre);



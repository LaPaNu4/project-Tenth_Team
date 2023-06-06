const { all } = require("axios");

const gallery = document.querySelector('.movies-gallery');
const searchMore = document.querySelector('.search-more');
const loadMore = document.querySelector('.load');
const emptyGallery = document.querySelector('.empty-gallery');
const dropDown = document.querySelector('.dropdown-library');
const dropMenuLibrary = document.querySelector('.dropdown-menu-library');


//adding dropdown functionality
// const dropContent = document.querySelector('.drop-content');
// const genresBtn = document.querySelector('.drop');
// const pickedGenre = document.querySelector('.drop-item');

// const dropShow = () => {
//     if(dropContent.classList.contains('show')) {
//         dropContent.classList.remove('show');
//         dropContent.classList.add('hide');
//     } else {
//         dropContent.classList.add('show');
//         dropContent.classList.remove('hide');
//     }
// }

// const chosenGenre = (e) => {
//     e.preventDefault();
//     let chosen = e.target;
//     console.log(chosen);
//
//     chosen.classList.toggle('orange');
//     genresBtn.classList.remove('orange');
//
//     genresBtn.textContent = chosen.textContent;
//
//     dropContent.classList.remove('show');
//     chosen.classList.remove('orange');
// }
//
// genresBtn.addEventListener('click', dropShow);
// dropContent.addEventListener('click', chosenGenre);



const STORAGE = 'favoriteMovies';
loadMore.classList.add('hide');
emptyGallery.classList.add('hide');
dropDown.classList.add('hide');


const renderedMovies = [];

function fetchFromLibrary() {
    const movieIds = JSON.parse(localStorage.getItem(STORAGE));
    const ids = movieIds.map(item => {
        return item.id;
    })
    console.log(movieIds);
    console.log(ids);   

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
            console.log(movieData)
            renderedMovies.push(...movieData);

            const moviesById = movieMarkUp(movieData);
            gallery.insertAdjacentHTML('beforeend', moviesById);
            loadMore.classList.add('show');
            loadMore.classList.remove('hide');
            dropDown.classList.add('show');
            dropDown.classList.remove('hide');

            filterMoviesByGenre(renderedMovies);
        })            
        .catch(error => {
            console.log(error);
        });
    }    


const filterMoviesByGenre = (movies) => {
    const genre = dropMenuLibrary.value;

    const chosenMovies = movies.filter(movie => movie.genre === genre);
    if(chosenMovies.length > 0) {
        const galleryItems = movieMarkUp(chosenMovies);
        gallery.insertAdjacentHTML('beforeend', galleryItems);
        loadMore.classList.add('show');
        loadMore.classList.remove('hide');
    } else {
        gallery.innerHTML = '';
        loadMore.classList.add('hide');
        loadMore.classList.remove('show');
    }
}    

const movieMarkUp = (dataComing) => {
    return dataComing.map(item => {
        const { poster_path, original_title, genre, year, popularity, id } = item;

        return `
        <div class="movie" id=${id}>
            <img class="movie-img" src="https://image.tmdb.org/t/p/w500${poster_path}">
            <h2 class="movie-title">${original_title}</h2>
            <h2 class="movie-genre">${genre}</h2>
            <h2 class="movie-year">${year}</h2>
            <span class="movie-rating">${popularity}</span>
        </div>`;
    }).join('');
}

window.onload = fetchFromLibrary;
dropDown.addEventListener('click', () => filterMoviesByGenre(renderedMovies));



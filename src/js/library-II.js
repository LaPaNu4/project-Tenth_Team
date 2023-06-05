const gallery = document.querySelector('.movies-galery');
const selectGenre = document.querySelector('.genres');
const searchMore = document.querySelector('.search-more');
const loadMore = document.querySelector('.load');
const emptyGallery = document.querySelector('.empty-gallery');


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

//loadMore.classList.add('hide');
// selectGenre.classList.add('hide');
//emptyGallery.classList.add('hide');
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '14b16a10583a3d9315723a356100e4ad';

function fetchFromLibrary(movieId) {
    const query = `${BASE_URL}?api_key=${API_KEY}&${movieId}`;

    return fetch(query)
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
        })
        .then(data => {
        return data;
        })
        .then(getAllStoredMovies)
        .then(filterMoviesByGenre)
        .catch(error => {
        console.log(error);
        throw new Error(error);
        });
}


const getAllStoredMovies = (e) => {
    e.preventDefault();
    // const movie = {
    //     img: img,
    //     title: title,
    //     genre: genre,
    //     year: year,
    //     rating: rating,
    // };

    const movies = JSON.parse(localStorage.getItem(STORAGE));
    console.log(movies);
    let movieId;

    if(movies) {
        return movieId = movies.map(item => {
            item.movie_id;
        });
    }
}

const filterMoviesByGenre = (movies) => {
    const genre = selectGenre.value;

    const chosenMovies = movies.filter(movie => movie.genre === genre);
    if(chosenMovies.length > 0) {
        const galleryItems = movieMarkUp(chosenMovies);
        gallery.insertAdjacentHTML('beforeend', galleryItems);
        loadMore.classList.add('show');
        loadMore.classList.remove('hide');
    }
}
    

const movieMarkUp = (dataComing) => {
    return dataComing.map(item => {
        const {img, title, genre, year, rating, id} = item;
        return `
        <div class="movie" id=${id}>
            <img class="movie-img" src="${img}">
            <h2 class="movie-title">${title}</h2>
            <h2 class="movie-genre">${genre}</h2>
            <h2 class="movie-year">${year}</h2>
            <span class="movie-rating">${rating}</span>
        </div>
        `;
}).join('');
}

// const emptyLibrary = () => {
//     searchMore.classList.add('show');
//     searchMore.classList.remove('hide');
//     selectGenre.classList.add('show');

// }

function onAddLibrary() {  
    const btnActiveValue = modalBtnEl.textContent;
    let favoriteMovies = [];
    // Retrieve existing array from localStorage or initialize an empty array  const storedMovies = localStorage.getItem('favoriteMovies');
    if (storedMovies) {    
        favoriteMovies = JSON.parse(storedMovies);
    }
    if (btnActiveValue === 'Add to my library') {    
        const movie = document.querySelector('.film-card-poster');
      const idMovie = movie.getAttribute('id');    
      favoriteMovies.push(idMovie);
      // Update localStorage with the updated array
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));  }
  }
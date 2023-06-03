const gallery = document.querySelector('.movies-galery');
const selectGenre = document.querySelector('.genres');
const searchMore = document.querySelector('.search-more');
const loadMore = document.querySelector('.load');
const emptyGallery = document.querySelector('.empty-gallery');



const movies = [];
const STORAGE = 'movies-from-storage';

loadMore.classList.add('hide');
// selectGenre.classList.add('hide');
emptyGallery.classList.add('hide');


const getStoredMovies = (e) => {
    e.preventDefault();

    const movie = {
        img: img,
        title: title,
        genre: genre,
        year: year,
        rating: rating,
    };
    

    const movies = localStorage.parse(localStorage.getItem(STORAGE));

    if(movies) {
        const genre = selectGenre.value;
        const chosenMovies = movies.filter(movie => movie.genre);

        const galleryItems = movieMarkUp(chosenMovies);
        gallery.insertAdjacentHTML('beforeend', galleryItems);
        loadMore.classList.add('show');
        loadMore.classList.remove('hide');
    }
    console.log('something');
    emptyLibrary();
}

const movieMarkUp = (dataComing) => {
    
    return dataComing.map(item => {
        const {img, title, genre, year, rating} = item;
        `
        <div class="movie">
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


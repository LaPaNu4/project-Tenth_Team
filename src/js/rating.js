// основна функція

// ratingActive = document.querySelector('.rating_active');
// ratingActive.style.width = '50%';

function addReting(value) {
    const ratingActive = document.querySelector('.rating_active');
    ratingActive.style.width = `${Math.round(value) * 10}%`;
    console.log(`${Math.round(value) * 10}%`);
}
addReting(2.3)

export {addReting};


// const ratings = document.querySelectorAll('.rating');
// if (ratings.length > 0) {
//     initRatings();
// }

// function initRatings() {

//     let ratingActive, ratingValue;

//     let ratingActive, ratingValue;   

//     for (let index = 0; index < ratings.length; index++){
//         const rating = ratings[index];
//         initRating(rating);
//     }

//     function initRating(rating){
//         initRatingVars(rating);

//         setRatingActiveWidth();
//         if (rating.classList.contains('.rating_set')) {
//             setRating(rating);}
//         }

//     // ініціалізація змінних
//     function initRatingVars(rating) {
//         ratingActive = rating.querySelector('.rating_active');
//         ratingValue = rating.querySelector('.rating_value');}
//     // змінюємо ширину активних зірок
//     function setRatingActiveWidth(index = ratingValue.innerHTML) {
//         const ratingActiveWidth = index / 0.05;
//         ratingActive.style.width = `${ratingActiveWidth}%`}


    // мщжливість вказувати оцінку
    // function setRating(rating) {
    //     const ratingItems = rating.querySelectorAll('.rating_item');
    //         for (let index = 0; index < ratingItems.length; index++){
    //     const ratingItem = ratingItems[index];
    //     ratingItem.addEventListener("mouseenter", function (e) {
    //         initRatingVars(rating);
    //         setRatingActiveWidth(ratingItem.value);
    //     });
    //     ratingItem.addEventListener("mouseleave", function (e) {
    //         // оновлення активних зірок
    //         setRatingActiveWidth();
    //     });
    //     ratingItem.addEventListener("click", function (e) {
    //         // оновлення змінних
    //         initRatingVars(rating);

    //         if (rating.dataset.ajax){
    //             // відправити на сервер
    //             setRatingValue(ratingItem.value, rating);
    //         } else {
    //             // відобразити вказану оцінку
    //             ratingValue.innerHTML = index + 1;
    //             setRatingActiveWidth();
    //         }
    //     });

    // }}
// }

const API_KEY = '1e886de40b098591f9b7dbcf56dc1fe5';
const URL = 'https://api.themoviedb.org/3/movie/{movie_id}/rating';

// async function setRatingValue(value, rating) {
//     if (!rating.classList.contains('rating_sending')) {
//         rating.classList.add('rating_sending');
//         let response = await fetch('rating.json', {
            
//             function getMovieRating(movieId) {
//                 const requestUrl = URL.replace('{movie_id}', movieId);
//                 const fullUrl = `${requestUrl}?api_key=${API_KEY}`;
              
//                 fetch(fullUrl, {
//                   method: 'GET'
//                 })
//                   .then(response => response.json())
//                   .then(data => {
//                     const rating = data.rating; // Припустимо, що рейтинг доступний в полі "rating" отриманих даних
//                     console.log(`Рейтинг фільму: ${rating}`);
//                     // Тут ви можете вивести рейтинг на екран або виконати інші дії з ним
//                   })
//                   .catch(error => {
//                     console.error('Сталася помилка при отриманні рейтингу фільму:', error);
//                   });
//               }          
//         });

//         if (response.ok) {
//             const result = await response.json();
//         }
//     }
// }















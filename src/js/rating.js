// основна функція

function initRatings() {
    let ratingActive;
    
    for (let index = 0; index < ratings.length; index++){
        const rating = ratings[index];
        initRating(rating);
    }
}

function initRating(rating){
    initRatingVars(rating);

    setRatingActiveWidth();
    if (rating.classList.contains('.rating_set')) {
        setRating(rating);
    }
}

// ініціалізація змінних
function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating_active');
    ratingValue = rating.querySelector('.rating_value');

}
// змінюємо ширину активних зірок
function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`
}

// мщжливість вказувати оцінку
function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating_item');
    for (let index = 0; index < ratingItems.length; index++){
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener("mouseenter", function (e) {
            initRatingVars(rating);
            setRatingActiveWidth(ratingItem.value);
        });
        ratingItem.addEventListener("mouseleave", function (e) {
            // оновлення активних зірок
            setRatingActiveWidth();
        });
        ratingItem.addEventListener("click", function (e) {
            // оновлення змінних
            initRatingVars(rating);

            if (rating.dataset.ajax){
                // відправити на сервер
                setRatingValue(ratingItem.value, rating);
            } else {
                // відобразити вказану оцінку
                ratingValue.innerHTML = index + 1;
                setRatingActiveWidth();
            }
        });

    }
}







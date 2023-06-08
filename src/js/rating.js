import Notiflix from 'notiflix';
export function addRating(value) {
  const ratingActive = document.querySelector('.rating_active');
  if (ratingActive) {
    ratingActive.style.width = `${Math.round(value) * 10}%`;
  }
}

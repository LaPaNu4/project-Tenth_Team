import axios from 'axios';
import Notiflix from 'notiflix';
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'api_key=d30846261444a5a49dd702fa51e06838';

// -------------------- Функция запроса ТОП фильмов

export async function getTopFilmsData(page) {
  try {
    const response = await axios.get(
      `${API_URL}trending/all/week?${API_KEY}&language=en-US&page=${page}`
    );
    return response;
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.warning('OOPS... SOMETHING WENT WRONG');
  }
}

// -------------------- Функция запроса фильмов по названию

export async function getFilmsData(page, request) {
  try {
    const response = await axios.get(
      `${API_URL}search/movie?${API_KEY}&query=${request}&page=${page}`
    );
    return response;
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.warning('OOPS... SOMETHING WENT WRONG');
  }
}

// -------------------- Функция запроса фильма по ID

export async function getFilmByID(id) {
  try {
    const response = await axios.get(
      `${API_URL}movie/${id}?${API_KEY}&language=en-US`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message);
    // Notiflix.Notify.warning('OOPS... SOMETHING WENT WRONG');
    return error.message;
  }
}

// -------------------- Функция запроса жанров

export async function getGenres() {
  try {
    const response = await axios.get(
      `${API_URL}genre/movie/list?${API_KEY}&language=en-US`
    );
    return response;
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.warning('OOPS... SOMETHING WENT WRONG');
  }
}

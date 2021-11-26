import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const KEY = 'api_key=e8d4c6f2420119eaaf1bee0b0d0a70d8';

const usual = () => {
  const lang = localStorage.getItem('lang') ?? 'en-US';
  const isAdult = localStorage.getItem('isAdult') ?? 'false';
  return `${KEY}&language=${lang}&include_adult=${isAdult}`;
};

async function getMovie(id) {
  let { data } = await axios.get(`/movie/${id}?${usual()}`);
  return data;
}

async function getReviews(id) {
  let { data } = await axios.get(`movie/${id}/reviews?${usual()}`);
  return data;
}

async function getCast(id) {
  let { data } = await axios.get(`movie/${id}/credits?${KEY}`);
  return data;
}

async function searshMovies(query, page) {
  let { data } = await axios.get(
    `/search/movie?${usual()}&query=${query}&page=${page}`,
  );
  return data;
}

async function getMoviesTopWeek() {
  let { data } = await axios.get(`/trending/movie/week?${usual()}}`);
  return data;
}

export { searshMovies, getMovie, getMoviesTopWeek, getReviews, getCast };

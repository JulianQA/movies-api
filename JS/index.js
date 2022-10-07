const URL_API = 'https://api.themoviedb.org/3';
const currentMoviesContainer = document.querySelector('.current-movies__container');
const URL_IMAGES = 'https://image.tmdb.org/t/p/w300';
const trendingMoviesContainer = document.querySelector('.trending-movies__container');
const topMovieContainer = document.querySelector('.main-movie__container');

async function fecthData(urlApi) {
    const response = await fetch(`${urlApi}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}

(async function getCurrentMovies() {
    const response = await fecthData(URL_API + '/movie/now_playing');
    const movies = response.results;
    renderCurrentMovies(movies);
})();

(async function getTrendingMovies() {
    const response = await fecthData(URL_API + '/trending/movie/week');
    const movies = response.results;
    renderTrendingMovies(movies);
})();

(async function getTopMovie() {
    const response = await fecthData(URL_API + '/trending/movie/week');
    const movies = response.results;
    const moviesOrdered = movies.sort((a, b) => b.vote_average - a.vote_average);
    renderTopMovie(moviesOrdered);
})();




function renderCurrentMovies(movies) {
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie__container');

        const movieImg = document.createElement('img');
        movieImg.setAttribute('src', `${URL_IMAGES}${movie.poster_path
            }`);
        movieImg.setAttribute('alt', movie.title);

        movieContainer.append(movieImg);
        currentMoviesContainer.append(movieContainer);
    });
}

function renderTrendingMovies(movies) {
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie__container');

        const movieImg = document.createElement('img');
        movieImg.setAttribute('src', `${URL_IMAGES}${movie.poster_path
            }`);
        movieImg.setAttribute('alt', movie.title);

        movieContainer.append(movieImg);
        trendingMoviesContainer.append(movieContainer);
    });
}

function renderTopMovie(movies) {
    const movie = movies[0];

    const movieImg = document.createElement('img');
    movieImg.setAttribute('src', `${URL_IMAGES}${movie.poster_path}`);
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('id', 'img-main');

    const detailDiv = document.createElement('div');
    detailDiv.classList.add('movie__info');

    const movieRating = document.createElement('div');
    movieRating.classList.add('info__rating');
    movieRating.textContent = movie.vote_average.toFixed(1);

    const moviePreview = document.createElement('div');
    moviePreview.classList.add('info__watch');
    moviePreview.textContent = 'Watch';

    detailDiv.append(movieRating, moviePreview);
    topMovieContainer.append(movieImg, detailDiv);
}
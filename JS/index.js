const URL_API = 'https://api.themoviedb.org/3';
const URL_IMAGES = 'https://image.tmdb.org/t/p/w300';

async function fecthData(urlApi, queryParameters = '') {
    const response = await fetch(`${urlApi}?api_key=${API_KEY}${queryParameters}`);
    const data = await response.json();
    return data;
}

async function getCurrentMovies() {
    const response = await fecthData(URL_API + '/movie/now_playing');
    const movies = response.results;
    renderCurrentMovies(movies);
};

async function getTrendingMovies() {
    const response = await fecthData(URL_API + '/trending/movie/week');
    const movies = response.results;
    renderTrendingMovies(movies);
};

async function getTopMovie() {
    const response = await fecthData(URL_API + '/trending/movie/week');
    const movies = response.results;
    const moviesOrdered = movies.sort((a, b) => b.vote_average - a.vote_average);
    renderTopMovie(moviesOrdered);
};

async function getCategories() {
    const response = await fecthData(URL_API + '/genre/movie/list');
    const categories = response.genres;
    renderCategories(categories);
};

async function getMovieByCategory(name, id) {
    const response = await fecthData(`${URL_API}/discover/movie`, `&with_genres=${id}`);
    const movies = response.results;
    console.log(response);
    renderMoviesByCategory(name, movies);
}


function renderCurrentMovies(movies) {
    currentMoviesContainer.innerHTML = '';
    renderMovieContainer(currentMoviesContainer, movies);
}

function renderTrendingMovies(movies) {
    trendingMoviesContainer.innerHTML = '';
    renderMovieContainer(trendingMoviesContainer, movies);
}

function renderTopMovie(movies) {
    topMovieContainer.innerHTML = '';
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

function renderCategories(categories) {
    categoriesContainer.innerHTML = '';
    categories.forEach(categorie => {
        const categorieTitle = document.createElement('div');
        categorieTitle.classList.add('categorie');
        categorieTitle.textContent = categorie.name;
        categorieTitle.addEventListener('click', () => location.hash = `#category=${categorie.name}-${categorie.id}`);
        categoriesContainer.append(categorieTitle);
    })
};

function renderMoviesByCategory(name, movies) {
    mainSearchByCategorie.innerHTML = '';
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = name;

    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results__container');

    mainSearchByCategorie.append(categoryTitle, resultsContainer);

    renderMovieContainer(resultsContainer, movies);
}

function renderMovieContainer(container, movies) {
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie__container');

        const movieImg = document.createElement('img');
        movieImg.setAttribute('src', `${URL_IMAGES}${movie.poster_path
            }`);
        movieImg.setAttribute('alt', movie.title);

        movieContainer.append(movieImg);
        container.append(movieContainer);
    });
}
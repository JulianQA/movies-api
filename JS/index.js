const URL_API = 'https://api.themoviedb.org/3';
const URL_IMAGES = 'https://image.tmdb.org/t/p/w300';


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    })
})
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
    renderMoviesByCategory(name, movies);
}

async function getMoviesBySearch(query) {
    const response = await fecthData(`${URL_API}/search/movie`, `&query=${query}`);
    const movies = response.results;
    maxPage = response.total_pages;
    renderMoviesBySearch(movies, { clean: true });
}
function getPaginatedBySearch(query) {
    return async function () {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        const isReadyToScroll = scrollTop + clientHeight >= scrollHeight - 15;
        const isAtMaxPage = page <= maxPage;

        if (isReadyToScroll && isAtMaxPage) {
            page++;
            const response = await fecthData(`${URL_API}/discover/movie`, `&query=${query}&page=${page}`);
            const movies = response.results;
            renderMoviesBySearch(movies, false);
        }
    }
}
async function getMovieDetail(id) {
    const response = await fecthData(`${URL_API}/movie/${id}`);
    renderMovieDetail(response);
}

async function getRelatedMovies(id) {
    const response = await fecthData(`${URL_API}/movie/${id}/similar`);
    const movies = response.results;
    renderMovieContainer(relatedMoviesContainer, movies, { lazyLoad: true });
}

async function getMovieByCategory(name, id) {
    const response = await fecthData(`${URL_API}/discover/movie`, `&with_genres=${id}`);
    const movies = response.results;
    maxPage = response.total_pages;
    renderMoviesByCategory(name, movies, { clean: true });
}


function getPaginatedByCategory(name, id) {
    return async function () {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        const isReadyToScroll = scrollTop + clientHeight >= scrollHeight - 15;
        const isAtMaxPage = page <= maxPage;

        if (isReadyToScroll && isAtMaxPage) {
            page++;
            const response = await fecthData(`${URL_API}/discover/movie`, `&with_genres=${id}&page=${page}`);
            const movies = response.results;
            renderMoviesByCategory(name, movies, false);
        }
    }
}
function renderCurrentMovies(movies) {
    renderMovieContainer(currentMoviesContainer, movies, { lazyLoad: true });
}

function renderTrendingMovies(movies) {
    renderMovieContainer(trendingMoviesContainer, movies, { lazyLoad: true });
}

function renderTopMovie(movies) {
    topMovieContainer.innerHTML = '';
    const movie = movies[0];

    const movieImg = document.createElement('img');
    movieImg.setAttribute('src', `${URL_IMAGES}${movie.poster_path}`);
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('id', 'img-main');
    movieImg.addEventListener('click', () => {
        location.hash = '#movie=' + movie.id;
    })

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
    createcategories(categoriesContainer, categories);
};

function renderMoviesByCategory(name, movies, toClean) {
    categoryTitle.textContent = name;
    renderMovieContainer(categoryView, movies, { lazyLoad: true, clean: toClean });

}

function renderMoviesBySearch(movies, toClean) {
    renderMovieContainer(resultsSection, movies, { lazyLoad: true, clean: toClean });
}

function renderMovieDetail(movie) {
    movieTitle.textContent = movie.title;
    movieRating.textContent = movie.vote_average.toFixed(1);
    movieDescripition.textContent = movie.overview;
    movieImg.setAttribute('src', `${URL_IMAGES}${movie.poster_path}`);
    createcategories(movieCategories, movie.genres)
    getRelatedMovies(movie.id);
}
function renderMovieContainer(container, movies, { lazyLoad = false, clean = true } = {}) {
    if (clean) {
        container.innerHTML = '';
    }
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie__container');
        const movieImg = document.createElement('img');
        movieImg.setAttribute(lazyLoad ? 'data-img' : 'src', `${URL_IMAGES}${movie.poster_path}`);
        movieImg.setAttribute('alt', movie.title);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://bitsofco.de/content/images/2018/12/broken-1.png');
            movieImg.style.objectFit = 'cover';
        })
        movieImg.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        })
        const likeBtn = document.createElement('div')
        likeBtn.classList.add('like__button');
        const heartIcon = document.createElement('i');
        heartIcon.setAttribute('class', 'fa-solid fa-heart');

        savedLikes()[movie.id] && likeBtn.classList.add('like__button--liked');

        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('like__button--liked');
            likeMovie(movie);
            getLikedMovies();
        });
        likeBtn.append(heartIcon);
        if (lazyLoad) {
            observer.observe(movieImg)
        }

        movieContainer.append(movieImg, likeBtn);
        container.append(movieContainer);
    });
}

function createcategories(container, categories) {
    container.innerHTML = '';
    categories.forEach(categorie => {
        const categorieTitle = document.createElement('div');
        categorieTitle.classList.add('categorie');
        categorieTitle.textContent = categorie.name;
        categorieTitle.addEventListener('click', () => location.hash = `#category=${categorie.name}-${categorie.id}`);
        container.append(categorieTitle);
    })
}

function savedLikes() {
    const itemLs = JSON.parse(localStorage.getItem('listOfMovies'));
    let movies;
    if (itemLs) {
        movies = itemLs;
    } else {
        movies = {};
    }
    return movies;
}


function likeMovie(movie) {
    const moviesLiked = savedLikes();
    if (moviesLiked[movie.id]) {
        delete moviesLiked[movie.id]
    } else {
        moviesLiked[movie.id] = movie;
    }
    localStorage.setItem('listOfMovies', JSON.stringify(moviesLiked));
}

function getLikedMovies() {
    const movies = Object.values(savedLikes());
    renderMovieContainer(likedMoviesContainer, movies, { lazyLoad: true });
}
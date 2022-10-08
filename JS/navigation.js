goBackArrow.addEventListener('click', () => {
    location.hash = '#home';
});

window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);

function navigation() {
    if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        moviePage();
    } else {
        homePage();
    }
}

function homePage() {
    console.log('home');

    mainMovieContainer.classList.remove('inactive');
    mainCurrentMovieContainer.classList.remove('inactive');
    mainTrendingMovieContainer.classList.remove('inactive');
    mainCategoriesContainer.classList.remove('inactive');

    searchResultsView.classList.add('inactive');
    movieDetailView.classList.add('inactive');


    getCurrentMovies();
    getTrendingMovies();
    getTopMovie();
    getCategories();
}
function searchPage() {
    console.log('search');
    mainMovieContainer.classList.add('inactive');
    mainCurrentMovieContainer.classList.add('inactive');
    mainTrendingMovieContainer.classList.add('inactive');
    mainCategoriesContainer.classList.add('inactive');

    searchResultsView.classList.remove('inactive');
    movieDetailView.classList.add('inactive');
}

function moviePage() {
    console.log('movie');
    mainMovieContainer.classList.add('inactive');
    mainCurrentMovieContainer.classList.add('inactive');
    mainTrendingMovieContainer.classList.add('inactive');
    mainCategoriesContainer.classList.add('inactive');

    searchResultsView.classList.add('inactive');
    movieDetailView.classList.remove('inactive');
}


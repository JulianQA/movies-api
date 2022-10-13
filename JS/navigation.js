goBackArrow.addEventListener('click', () => {
    history.back();
});
goToSearchView.addEventListener('click', () => {
    location.hash = '#search=';
});
goToHomeView.addEventListener('click', () => {
    location.hash = '#home';
})
searchResults.addEventListener('click', () => {
    location.hash = '#search=' + searchInput.value;
})
window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);

function navigation() {
    if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        moviePage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage() {
    goBackArrow.classList.add('inactive');
    mainMovieContainer.classList.remove('inactive');
    mainCurrentMovieContainer.classList.remove('inactive');
    mainTrendingMovieContainer.classList.remove('inactive');
    mainCategoriesContainer.classList.remove('inactive');

    searchResultsView.classList.add('inactive');
    movieDetailView.classList.add('inactive');
    mainSearchByCategorie.classList.add('inactive');



    getCurrentMovies();
    getTrendingMovies();
    getTopMovie();
    getCategories();
}
function searchPage() {
    goBackArrow.classList.remove('inactive');
    mainMovieContainer.classList.add('inactive');
    mainCurrentMovieContainer.classList.add('inactive');
    mainTrendingMovieContainer.classList.add('inactive');
    mainCategoriesContainer.classList.add('inactive');

    searchResultsView.classList.remove('inactive');
    movieDetailView.classList.add('inactive');
    mainSearchByCategorie.classList.add('inactive');

    const info = location.hash.split('=');
    if (info[1] !== '') {
        getMoviesBySearch(info[1]);
    }
}

function moviePage() {
    goBackArrow.classList.remove('inactive');
    mainMovieContainer.classList.add('inactive');
    mainCurrentMovieContainer.classList.add('inactive');
    mainTrendingMovieContainer.classList.add('inactive');
    mainCategoriesContainer.classList.add('inactive');

    searchResultsView.classList.add('inactive');
    movieDetailView.classList.remove('inactive');
    mainSearchByCategorie.classList.add('inactive');

    const info = location.hash.split('=');
    getMovieDetail(info[1]);
}

function categoryPage() {
    goBackArrow.classList.remove('inactive');
    mainMovieContainer.classList.add('inactive');
    mainCurrentMovieContainer.classList.add('inactive');
    mainTrendingMovieContainer.classList.add('inactive');
    mainCategoriesContainer.classList.add('inactive');

    searchResultsView.classList.add('inactive');
    movieDetailView.classList.add('inactive');
    mainSearchByCategorie.classList.remove('inactive');

    const [categoryName, categoryId] = location.hash.split('=')[1].split('-');

    getMovieByCategory(categoryName, categoryId);
}

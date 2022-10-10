goBackArrow.addEventListener('click', () => {
    location.hash = '#home';
});
goToSearchView.addEventListener('click', () => {
    location.hash = '#search=';
});
goToHomeView.addEventListener('click', () => {
    location.hash = '#home';
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
}

function homePage() {
    console.log('home');

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
    console.log('search');
    goBackArrow.classList.remove('inactive');
    mainMovieContainer.classList.add('inactive');
    mainCurrentMovieContainer.classList.add('inactive');
    mainTrendingMovieContainer.classList.add('inactive');
    mainCategoriesContainer.classList.add('inactive');

    searchResultsView.classList.remove('inactive');
    movieDetailView.classList.add('inactive');
    mainSearchByCategorie.classList.add('inactive');
}

function moviePage() {
    console.log('movie');
    goBackArrow.classList.remove('inactive');
    mainMovieContainer.classList.add('inactive');
    mainCurrentMovieContainer.classList.add('inactive');
    mainTrendingMovieContainer.classList.add('inactive');
    mainCategoriesContainer.classList.add('inactive');

    searchResultsView.classList.add('inactive');
    movieDetailView.classList.remove('inactive');
    mainSearchByCategorie.classList.add('inactive');
}

function categoryPage() {
    console.log('category');
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

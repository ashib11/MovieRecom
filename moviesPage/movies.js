let allMovies = [];
let currPage = 1; 
const moviePerPage = 8;

const movieContainer = document.getElementById('movieContainer');
const paginationContainer = document.getElementById('pagination-container');

async function initializeApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageFromUrl = parseInt(urlParams.get('page'), 10);
  if (!Number.isNaN(pageFromUrl) && pageFromUrl > 0) {
    currPage = pageFromUrl;
  } else {
    currPage = 1;
  }

  const response = await fetch('movies.json', { cache: 'no-store' });
  allMovies = await response.json();

  displayPage(allMovies, currPage);
  setupPagination(allMovies);
}

function displayPage(movieList, pageOneBased) {
  movieContainer.innerHTML = '';


  const zeroBased = pageOneBased - 1;
  const startIndex = moviePerPage * zeroBased;
  const endIndex = startIndex + moviePerPage;
  const paginatedItems = movieList.slice(startIndex, endIndex);

  const source = encodeURIComponent(window.location.pathname);

  paginatedItems.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
      <a href="/detail/detail.html?id=${encodeURIComponent(movie.imdbID)}&source=${source}&page=${pageOneBased}">
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
      </a>
    `;
    movieContainer.appendChild(movieCard);
  });
}

function setupPagination(movieList) {
  paginationContainer.innerHTML = '';
  const pageCount = Math.ceil(movieList.length / moviePerPage);

  for (let i = 1; i <= pageCount; ++i) {
    const btn = document.createElement('button');
    btn.innerText = i;
    if (currPage === i) btn.classList.add('active');

    btn.addEventListener('click', () => {
      currPage = i;
      displayPage(movieList, currPage);
      const currActive = document.querySelector('#pagination-container .active');
      if (currActive) currActive.classList.remove('active');
      btn.classList.add('active');
      const params = new URLSearchParams(window.location.search);
      params.set('page', String(currPage));
      history.replaceState(null, '', `?${params.toString()}`);
    });

    paginationContainer.appendChild(btn);
  }
}

initializeApp();

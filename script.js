// Example skeleton for loading movies from local JSON (or Firebase Firestore later)

const movies = [
  {
    title: "Inception",
    genre: "Action",
    year: 2010,
    poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
  },
  {
    title: "The Hangover",
    genre: "Comedy",
    year: 2009,
    poster: "https://image.tmdb.org/t/p/w500/8vNruSfhk5IoE4eZOc4UpvDn6tq.jpg",
  },
  // Add more movies here
];

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");

function displayMovies(movieList) {
  movieContainer.innerHTML = "";
  if (movieList.length === 0) {
    movieContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movieList.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.className = "movie-card";
    movieEl.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" width="150" />
      <h3>${movie.title} (${movie.year})</h3>
      <p><strong>Genre:</strong> ${movie.genre}</p>
    `;
    movieContainer.appendChild(movieEl);
  });
}

function filterMovies() {
  const searchText = searchInput.value.toLowerCase();
  const selectedGenre = genreFilter.value;

  const filtered = movies.filter((movie) => {
    const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre;
    const matchesSearch = movie.title.toLowerCase().includes(searchText);
    return matchesGenre && matchesSearch;
  });

  displayMovies(filtered);
}

searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);

displayMovies(movies);

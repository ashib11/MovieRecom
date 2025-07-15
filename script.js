document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("movieContainer");
  const searchInput = document.getElementById("searchInput");
  const genreFilter = document.getElementById("genreFilter");

  let movies = [];

  // Load movie data
  fetch("movies.json")
    .then(res => res.json())
    .then(data => {
      movies = data;
      renderMovies(movies);
    });

  function renderMovies(movieList) {
    container.innerHTML = "";
    movieList.forEach(movie => {
      const movieCard = document.createElement("div");
      movieCard.className = "movie-card";
      movieCard.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title} (${movie.year})</h3>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p>${movie.description}</p>
        <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>
      `;
      container.appendChild(movieCard);
    });
  }

  // Search functionality
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
    renderMovies(filtered);
  });

  // Filter by genre
  genreFilter.addEventListener("change", () => {
    const selected = genreFilter.value;
    const filtered = selected === "all" ? movies : movies.filter(m => m.genre === selected);
    renderMovies(filtered);
  });
});

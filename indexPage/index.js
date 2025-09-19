 async function initializeApp() {
        const response = await fetch('/featureMovies.json');
        const movies = await response.json();
        displayMovies(movies);
    }
    
    function displayMovies(movies) {
        const movieContainer = document.getElementById('movieContainer');
        movieContainer.innerHTML = '';
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
            <a href="/detail/detail.html?id=${movie.imdbID}">
                <img src="${movie.Poster}" alt="${movie.Title} Poster" />
                <h3>${movie.Title} (${movie.Year})</h3>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
            </a>
        `;
            movieContainer.appendChild(movieCard);
        });
    }

    initializeApp();
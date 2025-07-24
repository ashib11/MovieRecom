// detail.js

function formatRating(rated){
    if(!rated || rated=="N/A") return "Not Rated"; 

    const number = rated.match(/\d+/); 
    if(number) return number[0]+ "+"; 

    if(rated.toUpperCase() == "R") return "18+"; 
    if(rated.toUpperCase()=="G") return "All Age"; 

    return rated; 
}


async function getMovieData() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    try {
        const response = await fetch('featureMovies.json');
        const movies = await response.json();

        const movie = movies.find(m => m.imdbID === movieId);

        if (!movie) {
            document.getElementById('movieDetails').innerHTML = "<h2>Movie not found</h2>";
            return;
        }

        // ✅ Set background poster via CSS variable
        document.getElementById('detailPage').style.setProperty('--poster-bg', `url(${movie.Poster})`);
        const ageRestriction = formatRating(movie.Rated); 
      
        const movieHTML = `
            <div class="movie-info">
                <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title} Poster" />
                <h1>
                ${movie.Title} (${movie.Year})
                <span class = "ageRestriction">${ageRestriction}
                </h1>  
                
                <p><strong>Duration:</strong> ${movie.Runtime}</p>
                <p><strong>Rating:</strong> ${movie.imdbRating}/10</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>Director:</strong> ${movie.Director} </p>
                <p><strong>Actors:</strong> ${movie.Actors} </p>

                <div class="buttons">
                    <button class="watch-later">Add to Watch Later</button>
                    <button class="watched">Mark as Watched</button>
                </div>

                <div class="gallery">
                    <h2>Gallery</h2>
                    ${movie.Images.map(img => `<img src="${img}" alt="Gallery image" />`).join('')}
                </div>
            </div>
        `;

        document.getElementById('movieDetails').innerHTML = movieHTML;

    } catch (error) {
        console.error("Error loading movie details:", error);
        document.getElementById('movieDetails').innerHTML = "<h2>Error loading movie details</h2>";
    }
}

getMovieData();

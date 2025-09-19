
function initializeMyLists(user) {
    if (user) {

        fetchAndDisplayList(user.uid, 'watchLater', 'watchLaterContainer');
        fetchAndDisplayList(user.uid, 'watched', 'watchedContainer');
    } else {
      
        alert("You must be logged in to view your lists.");
        window.location.href = '/loginPage/login.html';
    }
}

function resolveDataUrlFromPath() {
    return '/moviesPage/movies.json'; 
}


async function fetchAndDisplayList(userId, listName, containerId) {
    const listRef = database.ref(`users/${userId}/${listName}`);
    const snapshot = await listRef.once('value');
    const movieIdsObject = snapshot.val();
    
    const container = document.getElementById(containerId);

    if (!movieIdsObject) {
        container.innerHTML = "<p>You haven't added any movies to this list yet.</p>";
        return;
    }

    const movieIds = Object.keys(movieIdsObject);
    
    const dataUrl = resolveDataUrlFromPath();
    console.log('Fetching dataUrl:', dataUrl);
    const response = await fetch(`${dataUrl}?v=${Date.now()}`, { cache: 'no-store' });

    const allMovies = await response.json();
    
    container.innerHTML = '';
    console.log("this is before baal", allMovies); 
    const userMovieList = allMovies.filter(movie => movieIds.includes(movie.imdbID));
    console.log("this is baal",userMovieList); 
    
    if (userMovieList.length === 0) {
        container.innerHTML = "<p>You haven't added any movies to this list yet.</p>";
        return;
    }
    console.log(userMovieList); 
    userMovieList.forEach(movie => {
        if (document.getElementById(`card-${listName}-${movie.imdbID}`)) {
        return; 
    }
        const movieCard = document.createElement('div');
  
        movieCard.id = `card-${listName}-${movie.imdbID}`;
        movieCard.className = 'movie-card';
        
        movieCard.innerHTML = `
            <a href="detail.html?id=${movie.imdbID}">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
            </a>
            <span class="remove-btn" onclick="removeFromList('${userId}', '${listName}', '${movie.imdbID}')">
                &times; 
            </span>
        `;
        container.appendChild(movieCard);
    });
}


function removeFromList(userId, listName, movieId) {
    if (!confirm("Are you sure you want to remove this movie from your list?")) {
        return; 
    }

    const movieRef = database.ref(`users/${userId}/${listName}/${movieId}`);
    
    movieRef.remove()
        .then(() => {
            console.log("Movie removed successfully!");     
            const cardToRemove = document.getElementById(`card-${listName}-${movieId}`);
            if (cardToRemove) {
                cardToRemove.remove();
            }
        })
        .catch((error) => {
            console.error("Error removing movie: ", error);
            alert("Failed to remove the movie. Please try again.");
        });
}
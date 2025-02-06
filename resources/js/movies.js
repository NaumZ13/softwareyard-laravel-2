document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchMovie');
    const movieResults = document.getElementById('movieResults');
    const loadingDiv = document.getElementById('loading');

    let currentPage = 1;
    let totalPages = 1;
    let isLoading = false;
    let query = '';

    const fetchMovies = async (query, page = 1) => {
        try {
            const response = await fetch(`/searchMovie?searchMovie=${encodeURIComponent(query)}&page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching movies:', error);
            return null;
        }
    };

    const renderMovies = (movies) => {
        if (!movies || !movies.results || movies.results.length === 0) {
            if (currentPage === 1) {
                movieResults.innerHTML = "<p class='text-red-400 text-2xl text-center'>No movies found.</p>";
            }
            return;
        }
    
        movieResults.innerHTML += movies.results.map(movie => movieCardTemplate(movie)).join("");
    };

    const movieCardTemplate = (movie) => `
        <a href="/movie/${movie.id}" class="movie-card" data-id="${movie.id}">
            <div class="bg-sky-200 rounded-lg shadow hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
               ${movie.poster_path ? 
                `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="hover:opacity-75 transition ease-in-out duration-150 w-full">` :
                `<div class="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">No Image Available</div>`
            }
                <div class="p-2 sm:p-4 flex-grow">
                    <h2 class="text-sm sm:text-lg font-semibold text-gray-800">${movie.title}</h2>
                    ${movie.release_date ? `<p class="text-gray-500 mt-2">Released: ${movie.release_date.split('-')[0]}</p>` : ''}
                    <p class="text-gray-500 mt-2 text-sm">${truncateText(movie.overview, 100)}</p>
                </div>
            </div>
        </a>
    `;

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    const loadMoreMovies = async () => {
        if (isLoading || currentPage >= totalPages) return;
    
        isLoading = true;
        loadingDiv.classList.remove('hidden');
    
        try {
            const data = await fetchMovies(query, currentPage + 1);
            if (data && data.results && data.results.length > 0) {
                currentPage++;
                totalPages = data.total_pages;
                renderMovies(data);
            }
        } catch (error) {
            console.error('Error loading more movies:', error);
        } finally {
            isLoading = false;
            loadingDiv.classList.add('hidden');
        }
    };

    const searchMovies = async () => {
        query = searchInput.value.trim();
        if (query === "") {
            movieResults.innerHTML = "<p class='text-red-400 text-2xl'>Please enter a search term.</p>";
            return;
        }
    
        currentPage = 1;
        totalPages = 1;
        movieResults.innerHTML = '';
        isLoading = true;
        loadingDiv.classList.remove('hidden');
    
        try {
            const data = await fetchMovies(query, currentPage);
            if (data && data.results) {
                totalPages = data.total_pages;
                renderMovies(data);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            isLoading = false;
            loadingDiv.classList.add('hidden');
        }
    };

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            loadMoreMovies();
        }
    });

    searchButton.addEventListener('click', searchMovies);

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchMovies();
        }
    });
});

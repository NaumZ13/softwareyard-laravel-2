document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchMovie');
    const movieResults = document.getElementById('movieResults');
    const loadingDiv = document.getElementById('loading');
    const sortByDropdown = document.getElementById('sortBy');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    let currentPage = 1;
    let totalPages = 1;
    let isLoading = false;
    let query = '';

    const fetchMovies = async (query, page = 1, sortBy = 'release_date.desc') => {
        try {
            const response = await fetch(`/searchMovie?searchMovie=${encodeURIComponent(query)}&page=${page}&sortBy=${sortBy}`);
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
        if (!movies || movies.length === 0) {
            movieResults.innerHTML = "<p class='text-red-400 text-2xl text-center'>No movies found.</p>";
            document.getElementById('sortingControls').classList.add('hidden');
            document.getElementById('pagination').classList.add('hidden');
            return;
        }

        movieResults.innerHTML = '';

        movieResults.innerHTML = movies.map(movie => movieCardTemplate(movie)).join("");
    };

    const movieCardTemplate = (movie) => `
        <a href="/movie/${movie.id}" class="movie-card flex flex-col h-full">
            <div class="bg-sky-200 rounded-lg shadow hover:shadow-lg transform transition-transform duration-300 hover:scale-105 h-full flex flex-col">
                ${movie.poster_path ? 
                    `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-64 object-cover hover:opacity-75 transition ease-in-out duration-150">` :
                    `<div class="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">No Image Available</div>`
                }
                <div class="p-2 sm:p-4 flex-grow flex flex-col justify-between">
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

    const sortMovies = (movies, sortBy) => {
        const [sortField, sortOrder] = sortBy.split('.');
    
        return movies.sort((a, b) => {
            if (sortField === 'release_date') {
                const dateA = new Date(a.release_date);
                const dateB = new Date(b.release_date);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            } else if (sortField === 'title') {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
                if (sortOrder === 'asc') {
                    return titleA.localeCompare(titleB); 
                } else {
                    return titleB.localeCompare(titleA);
                }
            }
            return 0;
        });
    };

    const updatePagination = () => {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    };

    const searchMovies = async () => {
        query = searchInput.value.trim();
        if (query === "") {
            movieResults.innerHTML = "<p class='text-red-400 text-2xl'>Please enter a search term.</p>";
            document.getElementById('sortingControls').classList.add('hidden');
            document.getElementById('pagination').classList.add('hidden');
            return;
        }

        currentPage = 1;
        movieResults.innerHTML = '';
        isLoading = true;
        loadingDiv.classList.remove('hidden');

        document.getElementById('sortingControls').classList.add('hidden');
        document.getElementById('pagination').classList.add('hidden');

        try {
            const data = await fetchMovies(query, currentPage, sortByDropdown.value);
            if (data && data.results) {
                totalPages = data.total_pages;

                document.getElementById('sortingControls').classList.remove('hidden');
                document.getElementById('pagination').classList.remove('hidden');

                renderMovies(sortMovies(data.results, sortByDropdown.value));
                updatePagination();
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            isLoading = false;
            loadingDiv.classList.add('hidden');
        }
    };

    const loadPage = async (page) => {
        if (isLoading) return;

        isLoading = true;
        loadingDiv.classList.remove('hidden');

        try {
            const data = await fetchMovies(query, page, sortByDropdown.value);
            if (data && data.results) {
                currentPage = page;
                renderMovies(sortMovies(data.results, sortByDropdown.value));
                updatePagination();
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            isLoading = false;
            loadingDiv.classList.add('hidden');
        }
    };

    searchButton.addEventListener('click', searchMovies);

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchMovies();
        }
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            loadPage(currentPage - 1);
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            loadPage(currentPage + 1);
        }
    });

    sortByDropdown.addEventListener('change', () => {
        if (query) {
            loadPage(currentPage);
        }
    });
});
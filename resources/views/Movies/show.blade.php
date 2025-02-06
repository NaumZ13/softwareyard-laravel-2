@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 pt-16">
    <div class="movie-info">
        <div
            class="container mx-auto px-4 py-16 text-white flex flex-col md:flex-row">
            @if($movie['poster_path'])
            <div class="flex-none">
                <img
                    src="https://image.tmdb.org/t/p/w500/{{$movie['poster_path']}}"
                    alt="cover"
                    class="md:w-96 w-64" />
            </div>
            @endif

            <div class="md:ml-24">
                <div class="flex justify-between">
                    <h2 class="text-4xl font-semibold">
                        {{ $movie['title'] }} ( {{ $movie['release_date_title'] }} )
                    </h2>

                    <button id="favoriteButton" class="ml-10" data-movie-id="{{ $movie['id'] }}" title="Add to Favorites">
                        <i id="heartIcon" class="fa-regular fa-heart"></i>
                    </button>
                </div>

                <div class="flex items-center text-gray-400 mt-1">
                    <span><i class="fa-solid fa-star text-yellow-500"></i></span>
                    <span class="ml-1">{{ $movie['vote_average'] }} % </span>
                    <span class="mx-2">|</span>
                    @foreach($movie['genres'] as $index => $genre)
                    <span>
                        {{ $genre['name'] }}
                        @if ($index < count($movie['genres']) - 1)
                            <span>,</span>
                    @endif
                    </span>
                    @endforeach
                    <span class="mx-2">|</span>
                    <span>{{$movie['runtime']}} mins</span>
                </div>
                <div class="mt-8">
                    <p class="text-gray-300">{{ $movie['overview'] }}</p>
                </div>

            </div>
        </div>
    </div>
    <div class="movie-cast border-b border-gray-800 text-white">
        <div class="container mx-auto px-4 py-16">
            @if(count($movie['cast']) > 0)
            <h2 class="text-4xl font-semibold">Cast</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-white">
                @foreach(array_slice($movie['cast'], 0, 10) as $cast)
                <div class="cast mt-8">
                    <a href="#">
                        <img
                            src="https://image.tmdb.org/t/p/w300/{{ $cast['profile_path'] }}"
                            alt="{{ $cast['name'] }}"
                            class="hover:opacity-75 transition ease-in-out duration-150" />
                    </a>
                    <div class="mt-2">
                        <a href="#" class="text-xl mt-2 hover:text-gray:300">
                            {{ $cast['name'] }}
                        </a>
                        <div class="text-gray-400">
                            {{ $cast['character'] }}
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
            @endif
        </div>
    </div>
    <div class="images-container container mx-auto px-4 py-16 text-white">
        @if(count($movie['images']['backdrops']) > 0)
        <div class="pb-12 mt-8">
            <h2 class="text-4xl font-semibold">Images</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
                @foreach($movie['images']['backdrops'] as $index => $image)
                <div>
                    <img
                        src="{{ 'https://image.tmdb.org/t/p/original' . $image['file_path'] }}"
                        alt="image"
                        class="hover:opacity-75 transition ease-in-out duration-150" />
                </div>
                @endforeach
            </div>
        </div>
        @endif
    </div>
</div>
@endsection
@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const favoriteButton = document.getElementById('favoriteButton');
        const heartIcon = document.getElementById('heartIcon');
        const movieId = favoriteButton.getAttribute('data-movie-id');
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.includes(movieId)) {
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid');
        }

        favoriteButton.addEventListener('click', function() {
            if (favorites.includes(movieId)) {
                favorites = favorites.filter(id => id !== movieId);
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
            } else {
                favorites.push(movieId);
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });
</script>
@endpush
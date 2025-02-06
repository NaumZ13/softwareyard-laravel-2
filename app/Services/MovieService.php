<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MovieService
{
    private $token;

    public function __construct()
    {
        $this->token = config('services.tmdb.token');
    }

    public function searchedMovies($search, $page = 1)
    {
        return Http::withToken($this->token)
            ->get("https://api.themoviedb.org/3/search/movie", [
                'query' => $search,
                'page' => $page
            ])
            ->json();
    }

    public function processMovieDetails($id)
    {
        $movie = Http::withToken($this->token)
            ->get("https://api.themoviedb.org/3/movie/{$id}?append_to_response=images,credits,videos")
            ->json();

        return [
            'id' => $movie['id'],
            'title' => $movie['title'],
            'release_date_title' => \Carbon\Carbon::parse($movie['release_date'])->format('Y'),
            'vote_average' => round($movie['vote_average'] * 10),
            'genres' => $movie['genres'],
            'overview' => $movie['overview'],
            'runtime' => $movie['runtime'],
            'poster_path' => $movie['poster_path'],
            'cast' => array_map(function ($cast) {
                return [
                    'name' => $cast['name'],
                    'character' => $cast['character'] ?? null,
                    'profile_path' => $cast['profile_path'] ?? null,
                ];
            }, $movie['credits']['cast']),
            'images' => [
                'backdrops' => collect($movie['images']['backdrops'])->take(6),
            ],
        ];
    }
}

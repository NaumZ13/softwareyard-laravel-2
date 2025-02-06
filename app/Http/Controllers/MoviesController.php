<?php

namespace App\Http\Controllers;

use App\Services\MovieService;
use Illuminate\Http\Request;

class MoviesController extends Controller
{
    private $movieService;

    public function __construct(MovieService $movieService)
    {
        $this->movieService = $movieService;
    }

    public function search(Request $request)
    {
        $search = $request->input('searchMovie');
        $page = $request->input('page', 1);

        $movies = $this->movieService->searchedMovies($search, $page);

        return response()->json($movies);
    }

    public function show(string $id)
    {
        try {
            $movie = $this->movieService->processMovieDetails($id);
        } catch (\Exception $e) {
            return redirect()->back();
        }

        return view('movies.show', [
            'movie' => $movie,
        ]);
    }
}

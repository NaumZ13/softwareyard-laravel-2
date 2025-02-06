<?php

use App\Http\Controllers\MoviesController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/searchMovie', [MoviesController::class, 'search'])->name('movies.search');
Route::get('/movie/{id}', [MoviesController::class, 'show'])->name('movies.show');

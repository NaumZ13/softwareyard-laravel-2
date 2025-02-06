@extends('layouts.app')

@section('content')
<div class="mt-10">
    <h1 class="text-center text-white mb-4 text-4xl">Movie Search App</h1>

    <div class="mt-10">
        <x-search-movie />
    </div>
    
    <div id="sortingControls" class="flex justify-end hidden">
        <select id="sortBy" class="mt-4 p-2 border border-gray-300 rounded-lg">
            <option value="release_date.desc">Release Date (Newest First)</option>
            <option value="release_date.asc">Release Date (Oldest First)</option>
            <option value="title.asc">Title ( A-Z )</option>
        </select>
    </div>


    <div id="loading" class="hidden flex justify-center items-center h-96">
        <div class="spinner-border animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
    </div>

    <div id="movieResults" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full px-4"></div>

    <div id="pagination" class="hidden flex justify-center mt-4 text-white">
        <button id="prevPage" class="p-2 mx-1 bg-blue-500 text-white rounded">Previous</button>
        <span id="pageInfo" class="p-2 mx-1">Page 1 of 10</span>
        <button id="nextPage" class="p-2 mx-1 bg-blue-500 text-white rounded">Next</button>
    </div>
</div>
@endsection
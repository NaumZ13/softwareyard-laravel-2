@extends('layouts.app')

@section('content')
<div class="mt-10">
    <h1 class="text-center text-white mb-4 text-4xl">Movie Search App</h1>

    <div class="mt-10">
        <x-search-movie />
    </div>

    <div id="loading" class="hidden flex justify-center items-center h-96">
        <div class="spinner-border animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
    </div>

    <div id="movieResults" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full px-4"></div>
</div>
@endsection
## Prerequisites

Before you begin, ensure that you have met the following requirements:

- PHP >= 8.0
- Composer (for PHP package management)
- Node.js (for frontend dependencies)
- NPM or Yarn (for package management)
- Laravel 11

## Setup Instructions

### 1. Clone the repository
First, clone this repository to your local machine using the following command:

git clone https://github.com/NaumZ13/softwareyard-laravel-2.git
cd your-repository

### 2. Install Dependencies 
composer install

### 3.  Set up the environment file
cp .env.example .env

### 4. Migrations 
php artisan migrate

### 5. Install front-end dependencies
npm install
npm run dev 

### 6. Serve the application
php artisan serve

### 7. TMDB TOKEN
Token is available in the .env file.


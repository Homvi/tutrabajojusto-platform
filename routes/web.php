<?php

use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicJobPostingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

// --- Public Job Routes ---
Route::get('/jobs-browse', [PublicJobPostingController::class, 'index'])->name('jobs.public.index');
Route::get('/jobs/{job}', [PublicJobPostingController::class, 'show'])->name('jobs.public.show');

// --- Authenticated Routes ---
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Routes for companies to manage their jobs
Route::middleware(['auth', 'verified'])->prefix('company')->group(function () {
    Route::get('/jobs', [JobPostingController::class, 'index'])->name('jobs.index');
    Route::get('/jobs/create', [JobPostingController::class, 'create'])->name('jobs.create');
    Route::get('/jobs/{job}', [JobPostingController::class, 'show'])->name('jobs.show');
    Route::post('/jobs', [JobPostingController::class, 'store'])->name('jobs.store');
    Route::patch('/jobs/{job}/publish', [JobPostingController::class, 'publish'])->name('jobs.publish');
    Route::delete('/jobs/{job}', [JobPostingController::class, 'destroy'])->name('jobs.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

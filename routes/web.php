<?php

use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Company\ApplicantController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\MyApplicationsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicJobPostingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

// --- Language Switching Route ---
Route::post('/language/switch', [LanguageController::class, 'switch'])->name('language.switch');

// --- Public Job Routes ---
Route::get('/jobs-browse', [PublicJobPostingController::class, 'index'])->name('jobs.public.index');
Route::get('/jobs/{job}', [PublicJobPostingController::class, 'show'])->name('jobs.public.show');

// --- Authenticated Routes ---
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store'])->name('jobs.apply');
    Route::get('/my-applications', [MyApplicationsController::class, 'index'])->name('my-applications.index');
});

// Routes for companies to manage their jobs
Route::middleware(['auth', 'verified'])->prefix('company')->group(function () {
    Route::get('/jobs', [JobPostingController::class, 'index'])->name('jobs.index');
    Route::get('/jobs/create', [JobPostingController::class, 'create'])->name('jobs.create');
    Route::get('/jobs/{job}', [JobPostingController::class, 'show'])->name('jobs.show');
    Route::get('/jobs/{job}/applicants', [JobPostingController::class, 'showApplicants'])->name('jobs.applicants');
    Route::post('/jobs', [JobPostingController::class, 'store'])->name('jobs.store');
    Route::patch('/jobs/{job}/publish', [JobPostingController::class, 'publish'])->name('jobs.publish');
    Route::delete('/jobs/{job}', [JobPostingController::class, 'destroy'])->name('jobs.destroy');
    Route::get('/applicants/{application}', [ApplicantController::class, 'show'])->name('applicants.show');
    Route::patch('/applications/{application}/status', [ApplicantController::class, 'updateStatus'])->name('applications.updateStatus');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --- New Admin Routes ---
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');
    Route::patch('/companies/{company}/validate', [CompanyController::class, 'validateCompany'])->name('companies.validate');
});

require __DIR__.'/auth.php';

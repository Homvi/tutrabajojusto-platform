<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MyApplicationsController extends Controller
{
    /**
     * Display a listing of the authenticated user's applications.
     */
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Ensure only job seekers can access this page
        if (! $user->isJobSeeker()) {
            abort(403, 'Unauthorized action.');
        }

        // Fetch the applications for the user's profile,
        // and eager load the related job posting and its company profile.
        $applications = $user->jobSeekerProfile
            ->applications()
            ->with(['jobPosting.companyProfile:id,company_name'])
            ->latest() // Order by most recent applications first
            ->get();

        return Inertia::render('Application/Index', [
            'applications' => $applications,
        ]);
    }
}

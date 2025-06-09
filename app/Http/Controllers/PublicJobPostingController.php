<?php

namespace App\Http\Controllers;

use App\Models\JobPosting;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PublicJobPostingController extends Controller
{
    /**
     * Display a listing of all published job postings.
     */
    public function index(): Response
    {
        $jobPostings = JobPosting::query()
            ->where('status', 'published')
            ->with('companyProfile:id,company_name,website') // Eager load company details
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('Public/Jobs/Index', [
            'jobPostings' => $jobPostings,
        ]);
    }

    /**
     * Display the specified job posting.
     */
    public function show(JobPosting $job): Response
    {
        // Ensure only published jobs can be viewed publicly.
        if ($job->status !== 'published') {
            abort(404);
        }

        // Eager load the company profile details for the view
        $job->load('companyProfile:id,company_name,website');

        $hasApplied = false;
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        // If a user is logged in and is a job seeker, check if they have applied.
        if ($user && $user->isJobSeeker() && $user->jobSeekerProfile) {
            $hasApplied = $job->applications()
                ->where('job_seeker_profile_id', $user->jobSeekerProfile->id)
                ->exists();
        }

        return Inertia::render('Public/Jobs/Show', [
            'jobPosting' => $job,
            'hasApplied' => $hasApplied, // Pass the application status to the frontend
        ]);
    }
}

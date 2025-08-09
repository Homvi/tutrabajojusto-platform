<?php

namespace App\Http\Controllers;

use App\Models\JobPosting;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class JobPostingController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the company's job postings.
     */
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (! $user->isCompany()) {
            abort(403, 'Unauthorized action.');
        }

        // Now also loading the count of applications for each job posting
        $jobPostings = $user->companyProfile?->jobPostings()
            ->withCount('applications')
            ->orderBy('created_at', 'desc')
            ->get() ?? collect();

        return Inertia::render('Job/Index', [
            'jobPostings' => $jobPostings,
        ]);
    }

    public function show(JobPosting $job): Response
    {
        // Authorization: Ensure the user can view this job posting
        $this->authorize('view', $job);

        return Inertia::render('Job/Show', [
            'jobPosting' => $job,
        ]);
    }

    /**
     * Display a list of applicants for a specific job posting.
     */
    public function showApplicants(JobPosting $job): Response
    {
        // Authorize that the company owns this job posting
        $this->authorize('view', $job);

        // Eager load the applications along with the job seeker's profile and user data
        $job->load(['applications.jobSeekerProfile.user']);

        return Inertia::render('Job/Applicants', [
            'job' => $job,
            'applications' => $job->applications,
        ]);
    }

    /**
     * Publish a job posting.
     */
    public function publish(JobPosting $job): RedirectResponse
    {
        // Authorization: Ensure the logged-in user's company owns this job posting
        $this->authorize('update', $job);

        $job->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        return redirect()->route('jobs.index')->with('success', 'Job published successfully.');
    }

    /**
     * Show the form for creating a new job posting.
     */
    public function create(): Response
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        // Ensure only authenticated companies can access this page
        if (! $user || ! $user->isCompany()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Job/Create');
    }

    /**
     * Store a newly created job posting in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        // Ensure only authenticated companies can perform this action
        if (! $user || ! $user->isCompany()) {
            abort(403, 'Unauthorized action.');
        }

        $companyProfile = $user->companyProfile;

        if (! $companyProfile) {
            abort(403, 'Company profile not found.');
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'responsibilities' => 'nullable|string',
            'qualifications' => 'nullable|string',
            'type' => 'required|in:on-site,hybrid,remote',
            'location' => 'nullable|string|max:255',
            'remote_policy' => 'nullable|string|max:255',
            'employment_type' => 'required|in:full-time,part-time,contract,internship',
            'start_date' => 'nullable|date',
            'salary_min' => 'required|integer|min:0',
            'salary_currency' => 'required|string|max:3',
            'salary_period' => 'required|in:yearly,monthly',
            'application_deadline' => 'nullable|date',
            'interview_rounds' => 'nullable|string|max:255',
            'application_process_duration' => 'nullable|string|max:255',
        ]);

        $companyProfile->jobPostings()->create($validatedData);

        return redirect()->route('dashboard')->with('success', 'Job posting created successfully.');
    }

    /**
     * Remove the specified job posting from storage.
     */
    public function destroy(JobPosting $job): RedirectResponse
    {
        // Authorization check
        $this->authorize('delete', $job);

        $job->delete();

        return redirect()->route('jobs.index')->with('success', 'Job deleted successfully.');
    }
}

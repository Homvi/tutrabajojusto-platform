<?php

namespace App\Http\Controllers;

use App\Models\JobPosting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobPostingController extends Controller
{
    /**
     * Show the form for creating a new job posting.
     */
    public function create()
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        // Ensure only authenticated companies can access this page
        if (!$user || !$user->isCompany()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Job/Create');
    }

    /**
     * Store a newly created job posting in storage.
     */
    public function store(Request $request)
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        // Ensure only authenticated companies can perform this action
        if (!$user || !$user->isCompany()) {
            abort(403, 'Unauthorized action.');
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

        $companyProfile = $user->companyProfile;

        $companyProfile->jobPostings()->create($validatedData);

        return redirect()->route('dashboard')->with('success', 'Job posting created successfully.');
    }
}

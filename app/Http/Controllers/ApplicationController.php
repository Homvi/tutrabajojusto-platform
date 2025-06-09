<?php

namespace App\Http\Controllers;

use App\Models\JobPosting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    /**
     * Store a new application for a job posting.
     */
    public function store(Request $request, JobPosting $job)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 1. Authorization: Ensure the user is a logged-in job seeker.
        if (! $user || ! $user->isJobSeeker()) {
            abort(403, 'Only job seekers can apply.');
        }

        // 2. Ensure the job seeker has a profile to apply with.
        $jobSeekerProfile = $user->jobSeekerProfile;

        if (! $jobSeekerProfile) {
            // Or redirect with an error message prompting them to create a profile.
            abort(403, 'You must complete your profile before applying.');
        }

        // 3. Prevent duplicate applications.
        $existingApplication = $job->applications()
            ->where('job_seeker_profile_id', $jobSeekerProfile->id)
            ->exists();

        if ($existingApplication) {
            return back()->with('error', 'You have already applied to this job.');
        }

        // 4. Create the application.
        $job->applications()->create([
            'job_seeker_profile_id' => $jobSeekerProfile->id,
            'status' => 'submitted', // Default status from migration
        ]);

        // 5. Redirect with a success message.
        return redirect()->route('jobs.public.show', $job)->with('success', 'Application submitted successfully!');
    }
}

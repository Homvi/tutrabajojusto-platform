<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ApplicantController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display the specified applicant's profile.
     */
    public function show(Application $application): Response
    {
        // Authorize that the company can view this application
        $this->authorize('view', $application);

        // If the application status is 'submitted', update it to 'viewed'.
        if ($application->status === 'submitted') {
            $application->update(['status' => 'viewed']);
        }

        // Eager load the full profile details for the view
        $application->load('jobSeekerProfile.user');

        return Inertia::render('Company/Applicant/Show', [
            'application' => $application,
        ]);
    }

    /**
     * Update the status of an application.
     */
    public function updateStatus(Request $request, Application $application)
    {
        // Authorize the action
        $this->authorize('update', $application);

        // Validate the incoming status
        $validated = $request->validate([
            'status' => ['required', Rule::in(['shortlisted', 'rejected'])],
        ]);

        $application->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Applicant status updated.');
    }
}

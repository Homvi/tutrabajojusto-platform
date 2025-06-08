<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        // Eager load the profile based on the user's role
        if ($user->isJobSeeker()) {
            $user->load('jobSeekerProfile');
        } elseif ($user->isCompany()) {
            $user->load('companyProfile');
        }

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            // Pass the profile data to the frontend
            'profileData' => $user->isJobSeeker() ? $user->jobSeekerProfile : $user->companyProfile,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        // This part handles updating the user's name and email
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // --- New Logic for Job Seeker Profile ---
        // We only run this logic if the authenticated user is a job seeker
        if ($user->isJobSeeker()) {
            // Validate the additional profile fields
            $profileData = $request->validate([
                'headline' => 'nullable|string|max:255',
                'summary' => 'nullable|string',
                'skills' => 'nullable|string',
                // For experience and education, you might want more complex validation
                // if they are structured objects, but for now, 'array' is a good start.
                'experience' => 'nullable|array',
                'education' => 'nullable|array',
            ]);

            // Use updateOrCreate to either create the profile if it doesn't exist
            // or update it if it does.
            $user->jobSeekerProfile()->updateOrCreate(
                ['user_id' => $user->id], // Condition to find the profile
                $profileData // Data to update or create with
            );
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

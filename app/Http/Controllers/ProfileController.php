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

        // The FormRequest now handles all validation, so we get all data from validated()
        $validatedData = $request->validated();

        // Use fill to update the user model with validated name/email
        $user->fill($validatedData);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // If the user is a job seeker, update their profile with the relevant data
        if ($user->isJobSeeker()) {
            // Filter the validated data to get only the keys relevant to the profile
            $profileData = collect($validatedData)->only([
                'headline',
                'summary',
                'skills',
                'experience',
                'education',
            ])->all();

            // Only attempt to update if there is profile data present
            if (! empty($profileData)) {
                $user->jobSeekerProfile()->updateOrCreate(
                    ['user_id' => $user->id], // Condition to find the profile
                    $profileData // Data to update or create with
                );
            }
        }

        return Redirect::route('profile.edit')->with('success', 'Profile updated successfully.');
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

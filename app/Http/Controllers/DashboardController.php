<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user's dashboard.
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $data = [];

        if ($user && $user->isCompany() && $user->companyProfile) {
            $data['recentJobPostings'] = $user->companyProfile
                ->jobPostings()
                ->withCount('applications')
                ->latest()
                ->take(5)
                ->get();
        }

        if ($user && $user->isJobSeeker() && $user->jobSeekerProfile) {
            $data['recentApplications'] = $user->jobSeekerProfile
                ->applications()
                ->with(['jobPosting.companyProfile'])
                ->latest()
                ->take(5)
                ->get();
        }

        return Inertia::render('Dashboard', $data);
    }
}

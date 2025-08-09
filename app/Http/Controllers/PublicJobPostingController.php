<?php

namespace App\Http\Controllers;

use App\Models\JobPosting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PublicJobPostingController extends Controller
{
    /**
     * Display a listing of all published job postings, with filtering and sorting.
     */
    public function index(Request $request): Response
    {
        // Validate the incoming filter and sort parameters
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'sort' => ['nullable', 'string', Rule::in(['latest', 'salary_high_to_low', 'salary_low_to_high'])],
            'types' => ['nullable', 'array'],
            'types.*' => ['nullable', 'string', Rule::in(['remote', 'hybrid', 'on-site'])],
        ]);

        $jobPostingsQuery = JobPosting::query()
            ->where('status', 'published')
            // Add this condition to only include jobs from validated companies
            ->whereHas('companyProfile', function ($query): void {
                $query->where('is_validated', true);
            })
            ->with('companyProfile:id,company_name,website');

        // Apply the search filter if a search term is provided
        if (! empty($validated['search'])) {
            $search = strtolower((string) $validated['search']);
            $jobPostingsQuery->where(function ($query) use ($search): void {
                $query->whereRaw('LOWER(title) LIKE ?', [sprintf('%%%s%%', $search)])
                    ->orWhereRaw('LOWER(description) LIKE ?', [sprintf('%%%s%%', $search)])
                    ->orWhereHas('companyProfile', function ($query) use ($search): void {
                        $query->whereRaw('LOWER(company_name) LIKE ?', [sprintf('%%%s%%', $search)]);
                    });
            });
        }

        // Apply the work type filter if any types are selected
        if (! empty($validated['types'])) {
            $jobPostingsQuery->whereIn('type', $validated['types']);
        }

        // Apply sorting based on the 'sort' parameter
        $sort = $validated['sort'] ?? 'latest';
        match ($sort) {
            'salary_high_to_low' => $jobPostingsQuery->orderBy('salary_min', 'desc'),
            'salary_low_to_high' => $jobPostingsQuery->orderBy('salary_min', 'asc'),
            default => $jobPostingsQuery->orderBy('published_at', 'desc'),
        };

        $jobPostings = $jobPostingsQuery->get();

        return Inertia::render('Public/Jobs/Index', [
            'jobPostings' => $jobPostings,
            'filters' => $validated,
        ]);
    }

    /**
     * Display the specified job posting.
     */
    public function show(JobPosting $job): Response
    {
        // Ensure only published jobs from validated companies can be viewed publicly.
        if ($job->status !== 'published' || ! $job->companyProfile?->is_validated) {
            abort(404);
        }

        // Eager load the company profile details for the view
        $job->load('companyProfile:id,company_name,website');

        $hasApplied = false;
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        if ($user && $user->isJobSeeker() && $user->jobSeekerProfile) {
            $hasApplied = $job->applications()
                ->where('job_seeker_profile_id', $user->jobSeekerProfile->getKey())
                ->exists();
        }

        return Inertia::render('Public/Jobs/Show', [
            'jobPosting' => $job,
            'hasApplied' => $hasApplied,
        ]);
    }
}

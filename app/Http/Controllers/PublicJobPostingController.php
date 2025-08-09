<?php

namespace App\Http\Controllers;

use App\Models\JobPosting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
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

        // Create cache key based on filters and sort
        $cacheKey = $this->generateCacheKey($validated);
        
        // Cache the results for 15 minutes to improve performance
        $jobPostings = Cache::remember($cacheKey, 900, function () use ($validated) {
            return $this->getFilteredJobPostings($validated);
        });

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

    /**
     * Get filtered job postings with optimized queries.
     */
    private function getFilteredJobPostings(array $filters): \Illuminate\Database\Eloquent\Collection
    {
        $jobPostingsQuery = JobPosting::query()
            ->where('status', 'published')
            // Add this condition to only include jobs from validated companies
            ->whereHas('companyProfile', function ($query) {
                $query->where('is_validated', true);
            })
            ->with(['companyProfile:id,company_name,website']) // Eager load to prevent N+1 queries
            ->select(['id', 'title', 'description', 'salary_min', 'salary_currency', 'salary_period', 'type', 'employment_type', 'location', 'status', 'company_profile_id', 'created_at', 'published_at']);

        // Apply the search filter if a search term is provided
        if (! empty($filters['search'])) {
            $search = strtolower($filters['search']);
            $jobPostingsQuery->where(function ($query) use ($search) {
                $query->whereRaw('LOWER(title) LIKE ?', ["%{$search}%"])
                    ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"])
                    ->orWhereHas('companyProfile', function ($query) use ($search) {
                        $query->whereRaw('LOWER(company_name) LIKE ?', ["%{$search}%"]);
                    });
            });
        }

        // Apply the work type filter if any types are selected
        if (! empty($filters['types'])) {
            $jobPostingsQuery->whereIn('type', $filters['types']);
        }

        // Apply sorting based on the 'sort' parameter
        $sort = $filters['sort'] ?? 'latest';
        match ($sort) {
            'salary_high_to_low' => $jobPostingsQuery->orderBy('salary_min', 'desc'),
            'salary_low_to_high' => $jobPostingsQuery->orderBy('salary_min', 'asc'),
            default => $jobPostingsQuery->orderBy('published_at', 'desc'),
        };

        return $jobPostingsQuery->get();
    }

    /**
     * Generate a unique cache key based on filters and sort.
     */
    private function generateCacheKey(array $filters): string
    {
        $key = 'job_postings_public';
        
        if (! empty($filters['search'])) {
            $key .= '_search_' . md5($filters['search']);
        }
        
        if (! empty($filters['sort'])) {
            $key .= '_sort_' . $filters['sort'];
        }
        
        if (! empty($filters['types'])) {
            $key .= '_types_' . implode('_', $filters['types']);
        }
        
        return $key;
    }
}

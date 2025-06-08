<?php

namespace App\Policies;

use App\Models\JobPosting;
use App\Models\User;

class JobPostingPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobPosting $jobPosting): bool
    {
        // A user can view a job posting if their company profile ID
        // matches the company_profile_id on the job posting.
        // This keeps the company's job details private for now.
        return $user->companyProfile->id === $jobPosting->company_profile_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobPosting $jobPosting): bool
    {
        // A user can update a job posting if their company profile ID
        // matches the company_profile_id on the job posting.
        return $user->companyProfile->id === $jobPosting->company_profile_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobPosting $jobPosting): bool
    {
        // A user can delete a job posting if their company profile ID
        // matches the company_profile_id on the job posting.
        return $this->update($user, $jobPosting);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, JobPosting $jobPosting): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, JobPosting $jobPosting): bool
    {
        return false;
    }
}

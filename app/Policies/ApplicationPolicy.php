<?php

namespace App\Policies;

use App\Models\Application;
use App\Models\User;

class ApplicationPolicy
{
    /**
     * Determine whether the user can view the model.
     * This is for a company viewing an application made to one of their jobs.
     */
    public function view(User $user, Application $application): bool
    {
        // A user can view an application if they are a company and
        // the application's job posting belongs to their company profile.
        return $user->isCompany() &&
            $user->companyProfile?->getKey() === $application->jobPosting->company_profile_id;
    }

    /**
     * Determine whether the user can update the model.
     * This is for a company updating an application's status.
     */
    public function update(User $user, Application $application): bool
    {
        // The logic is the same as viewing.
        return $this->view($user, $application);
    }
}

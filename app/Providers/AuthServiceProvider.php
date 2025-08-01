<?php

namespace App\Providers;

use App\Models\Application;
use App\Models\JobPosting;
use App\Policies\ApplicationPolicy;
use App\Policies\JobPostingPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        JobPosting::class => JobPostingPolicy::class,
        Application::class => ApplicationPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}

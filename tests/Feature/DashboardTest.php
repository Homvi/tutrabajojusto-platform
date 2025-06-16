<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\CompanyProfile;
use App\Models\JobPosting;
use App\Models\JobSeekerProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the dashboard for a job seeker is displayed correctly.
     */
    public function test_job_seeker_dashboard_is_displayed_correctly(): void
    {
        // 1. Arrange: Create a job seeker user with a profile and an application.
        $jobSeeker = User::factory()
            ->has(JobSeekerProfile::factory()->has(Application::factory()->count(1)), 'jobSeekerProfile')
            ->create(['role' => 'job_seeker']);

        // 2. Act: Log in as the job seeker and visit the dashboard.
        $response = $this->actingAs($jobSeeker)->get(route('dashboard'));

        // 3. Assert: Check that the response is successful and renders the correct component.
        $response->assertOk();
        $response->assertInertia(
            fn ($assert) => $assert
                ->component('Dashboard')
                // Assert that the 'recentApplications' prop is present and is an array.
                ->has('recentApplications')
                ->where('recentApplications.0.job_seeker_profile_id', $jobSeeker->jobSeekerProfile->id)
        );
    }

    /**
     * Test that the dashboard for a company is displayed correctly.
     */
    public function test_company_dashboard_is_displayed_correctly(): void
    {
        // 1. Arrange: Create a company user with a profile and a job posting.
        $company = User::factory()
            ->has(CompanyProfile::factory()->has(JobPosting::factory()->count(1)), 'companyProfile')
            ->create(['role' => 'company']);

        // 2. Act: Log in as the company user and visit the dashboard.
        $response = $this->actingAs($company)->get(route('dashboard'));

        // 3. Assert: Check that the response is successful and renders the correct component.
        $response->assertOk();
        $response->assertInertia(
            fn ($assert) => $assert
                ->component('Dashboard')
                // Assert that the 'recentJobPostings' prop is present and is an array.
                ->has('recentJobPostings')
                ->where('recentJobPostings.0.company_profile_id', $company->companyProfile->id)
        );
    }
}

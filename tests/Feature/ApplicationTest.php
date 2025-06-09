<?php

namespace Tests\Feature;

use App\Models\CompanyProfile;
use App\Models\JobPosting;
use App\Models\JobSeekerProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApplicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_job_seeker_can_apply_to_a_job(): void
    {
        // Arrange: Create a company with a published job posting
        $companyUser = User::factory()->create(['role' => 'company']);
        $companyProfile = CompanyProfile::factory()->create(['user_id' => $companyUser->id]);
        $jobPosting = JobPosting::factory()->create([
            'company_profile_id' => $companyProfile->id,
            'status' => 'published',
        ]);

        // Arrange: Create a job seeker with a profile
        $jobSeekerUser = User::factory()->create(['role' => 'job_seeker']);
        JobSeekerProfile::factory()->create(['user_id' => $jobSeekerUser->id]);

        // Act: The job seeker applies for the job
        $response = $this->actingAs($jobSeekerUser)->post(route('jobs.apply', $jobPosting));

        // Assert: Check for a successful redirect and success message
        $response->assertRedirect(route('jobs.public.show', $jobPosting));
        $response->assertSessionHas('success', 'Application submitted successfully!');

        // Assert: Check that the application was created in the database
        $this->assertDatabaseHas('applications', [
            'job_posting_id' => $jobPosting->id,
            'job_seeker_profile_id' => $jobSeekerUser->jobSeekerProfile->id,
        ]);
    }

    public function test_a_job_seeker_cannot_apply_to_the_same_job_twice(): void
    {
        // Arrange: Create a company and job
        $companyUser = User::factory()->create(['role' => 'company']);
        $companyProfile = CompanyProfile::factory()->create(['user_id' => $companyUser->id]);
        $jobPosting = JobPosting::factory()->create(['company_profile_id' => $companyProfile->id, 'status' => 'published']);

        // Arrange: Create a job seeker and have them apply once
        $jobSeekerUser = User::factory()->create(['role' => 'job_seeker']);
        JobSeekerProfile::factory()->create(['user_id' => $jobSeekerUser->id]);
        $this->actingAs($jobSeekerUser)->post(route('jobs.apply', $jobPosting));

        // Act: The job seeker attempts to apply again
        $response = $this->actingAs($jobSeekerUser)->post(route('jobs.apply', $jobPosting));

        // Assert: Check for a redirect back with an error message
        $response->assertRedirect();
        $response->assertSessionHas('error', 'You have already applied to this job.');

        // Assert: Ensure there is still only one application in the database
        $this->assertDatabaseCount('applications', 1);
    }

    public function test_a_company_cannot_apply_to_a_job(): void
    {
        // Arrange: Create a company with a job
        $companyUser = User::factory()->create(['role' => 'company']);
        $companyProfile = CompanyProfile::factory()->create(['user_id' => $companyUser->id]);
        $jobPosting = JobPosting::factory()->create(['company_profile_id' => $companyProfile->id, 'status' => 'published']);

        // Act: The company user attempts to apply
        $response = $this->actingAs($companyUser)->post(route('jobs.apply', $jobPosting));

        // Assert: Check that the server responded with a 403 Forbidden status
        $response->assertStatus(403);
    }
}

<?php

namespace Tests\Feature\Public;

use App\Models\CompanyProfile;
use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('only jobs from validated companies are shown on the public index page', function () {
    // 1. Arrange
    // Create a validated company and a published job posting for it.
    $validatedCompanyUser = User::factory()->create(['role' => 'company']);
    $validatedCompanyProfile = CompanyProfile::factory()->create([
        'user_id' => $validatedCompanyUser->id,
        'is_validated' => true,
    ]);
    $validatedJob = JobPosting::factory()->create([
        'company_profile_id' => $validatedCompanyProfile->id,
        'status' => 'published',
        'title' => 'Job from Validated Company',
    ]);

    // Create an unvalidated company and a published job posting for it.
    $unvalidatedCompanyUser = User::factory()->create(['role' => 'company']);
    $unvalidatedCompanyProfile = CompanyProfile::factory()->create([
        'user_id' => $unvalidatedCompanyUser->id,
        'is_validated' => false,
    ]);
    $unvalidatedJob = JobPosting::factory()->create([
        'company_profile_id' => $unvalidatedCompanyProfile->id,
        'status' => 'published',
        'title' => 'Job from Unvalidated Company',
    ]);

    // 2. Act: Visit the public job listings page.
    $response = $this->get(route('jobs.public.index'));

    // 3. Assert
    $response->assertOk();
    // Assert that the job from the validated company is visible.
    $response->assertSee('Job from Validated Company');
    // Assert that the job from the unvalidated company is NOT visible.
    $response->assertDontSee('Job from Unvalidated Company');
});

test('a job from an unvalidated company cannot be viewed directly', function () {
    // 1. Arrange: Create an unvalidated company with a published job.
    $unvalidatedCompanyUser = User::factory()->create(['role' => 'company']);
    $unvalidatedCompanyProfile = CompanyProfile::factory()->create([
        'user_id' => $unvalidatedCompanyUser->id,
        'is_validated' => false,
    ]);
    $unvalidatedJob = JobPosting::factory()->create([
        'company_profile_id' => $unvalidatedCompanyProfile->id,
        'status' => 'published',
    ]);

    // 2. Act: Attempt to visit the direct URL for the unvalidated job.
    $response = $this->get(route('jobs.public.show', $unvalidatedJob));

    // 3. Assert: Check that this results in a "Not Found" error.
    $response->assertStatus(404);
});

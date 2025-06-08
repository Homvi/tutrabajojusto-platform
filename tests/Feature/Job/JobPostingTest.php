<?php

namespace Tests\Feature\Job;

use App\Models\CompanyProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Test case for successful job posting
test('an authenticated company can create a job posting', function () {
    // 1. Arrange: Create a user with a 'company' role and a linked profile.
    $companyUser = User::factory()->create(['role' => 'company']);
    $companyProfile = CompanyProfile::factory()->create(['user_id' => $companyUser->id]);

    // Define valid data for a new job posting.
    $jobData = [
        'title' => 'Senior Laravel Developer',
        'description' => 'We are looking for an experienced Laravel developer.',
        'type' => 'remote',
        'employment_type' => 'full-time',
        'salary_min' => 6000000, // 60,000.00 EUR in cents
        'salary_currency' => 'EUR',
        'salary_period' => 'yearly',
    ];

    // 2. Act: Simulate the company user making a POST request to the store route.
    $response = $this->actingAs($companyUser)->post(route('jobs.store'), $jobData);

    // 3. Assert: Verify the outcome.
    // Check for a successful redirect to the dashboard.
    $response->assertRedirect(route('dashboard'));
    // Check that a "success" message is present in the session flash data.
    $response->assertSessionHas('success', 'Job posting created successfully.');

    // Assert that the job posting was created in the database with the correct data.
    $this->assertDatabaseHas('job_postings', [
        'company_profile_id' => $companyProfile->id,
        'title' => 'Senior Laravel Developer',
        'salary_min' => 6000000,
    ]);
});

// Test case for authorization
test('a job seeker cannot create a job posting', function () {
    // Arrange: Create a user with a 'job_seeker' role.
    $jobSeekerUser = User::factory()->create(['role' => 'job_seeker']);

    $jobData = ['title' => 'This should fail'];

    // Act: Simulate the job seeker trying to post a job.
    $response = $this->actingAs($jobSeekerUser)->post(route('jobs.store'), $jobData);

    // Assert: Check that the server responded with a 403 Forbidden status code.
    $response->assertStatus(403);
});

// Test case for validation
test('job posting requires a title and minimum salary', function () {
    // Arrange: Create a company user.
    $companyUser = User::factory()->create(['role' => 'company']);
    CompanyProfile::factory()->create(['user_id' => $companyUser->id]);

    // Act: Attempt to post with an empty title.
    $response = $this->actingAs($companyUser)->post(route('jobs.store'), [
        'title' => '', // Invalid
        'salary_min' => 5000000,
    ]);

    // Assert: Check for a validation error for the 'title' field.
    $response->assertSessionHasErrors('title');

    // Act: Attempt to post without a salary.
    $response = $this->actingAs($companyUser)->post(route('jobs.store'), [
        'title' => 'Valid Title',
        'salary_min' => '', // Invalid
    ]);

    // Assert: Check for a validation error for the 'salary_min' field.
    $response->assertSessionHasErrors('salary_min');
});

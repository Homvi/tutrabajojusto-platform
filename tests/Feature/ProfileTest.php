<?php

namespace Tests\Feature;

use App\Models\JobSeekerProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/profile');

        $response->assertOk();
    }

    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User',
                'email' => $user->email,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    /**
     * New test case for updating a job seeker's professional profile.
     */
    public function test_job_seeker_professional_profile_can_be_updated(): void
    {
        // 1. Arrange: Create a user with a 'job_seeker' role and an empty profile.
        $user = User::factory()->has(JobSeekerProfile::factory(), 'jobSeekerProfile')->create([
            'role' => 'job_seeker',
        ]);

        // Define the profile data we want to save.
        $profileData = [
            'headline' => 'Experienced Full-Stack Developer',
            'summary' => 'A summary of my professional background.',
            'skills' => 'Laravel, React, TypeScript',
            'experience' => [
                [
                    'title' => 'Senior Developer',
                    'company' => 'Tech Corp',
                    'dates' => '2020 - Present',
                    'description' => 'Building amazing things.',
                ],
            ],
            'education' => [
                [
                    'degree' => 'BSc in Computer Science',
                    'institution' => 'University of Tech',
                    'year' => '2019',
                ],
            ],
        ];

        // 2. Act: Simulate the user submitting the form with ONLY the new profile data.
        $response = $this
            ->actingAs($user)
            ->patch('/profile', $profileData);

        // 3. Assert: Check the outcome.
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        // Refresh the user's profile from the database to get the latest data.
        $user->jobSeekerProfile->refresh();

        $this->assertSame('Experienced Full-Stack Developer', $user->jobSeekerProfile->headline);
        $this->assertSame('Laravel, React, TypeScript', $user->jobSeekerProfile->skills);
        $this->assertCount(1, $user->jobSeekerProfile->experience);
        $this->assertSame('Senior Developer', $user->jobSeekerProfile->experience[0]['title']);
    }

    /**
     * New test case to ensure validation works for the job seeker profile form.
     */
    public function test_job_seeker_profile_data_is_validated(): void
    {
        // Arrange: Create a job seeker user.
        $user = User::factory()->create(['role' => 'job_seeker']);

        // Act: Send a request with a headline that is too long.
        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'headline' => str_repeat('a', 300), // Exceeds the 255 character limit
            ]);

        // Assert: Check for the specific validation error.
        $response->assertSessionHasErrors('headline');
    }

    /**
     * New test case to ensure a company user can update their info without errors.
     */
    public function test_company_user_can_update_profile_without_job_seeker_fields(): void
    {
        // Arrange: Create a user with a 'company' role.
        $user = User::factory()->create(['role' => 'company']);

        // Act: Simulate the company user updating only their name.
        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'New Company Name',
                'email' => $user->email,
            ]);

        // Assert: Ensure the request was successful and had no errors.
        $response->assertSessionHasNoErrors();
        $response->assertRedirect('/profile');
        $this->assertSame('New Company Name', $user->fresh()->name);
    }

    public function test_user_can_delete_their_account(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete('/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_correct_password_must_be_provided_to_delete_account(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect('/profile');

        $this->assertNotNull($user->fresh());
    }
}

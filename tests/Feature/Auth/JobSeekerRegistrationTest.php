<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('a job seeker can register', function () {
    $jobSeekerData = [
        'name' => 'John Doe',
        'email' => 'john.doe@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ];

    $response = $this->post('/register-job-seeker', $jobSeekerData);

    $response->assertRedirect(route('dashboard'));
    $this->assertAuthenticated();

    $user = User::where('email', $jobSeekerData['email'])->first();

    $this->assertNotNull($user);
    $this->assertEquals('job_seeker', $user->role);

    $this->assertDatabaseHas('users', [
        'email' => 'john.doe@example.com',
        'role' => 'job_seeker',
    ]);

    $this->assertDatabaseHas('job_seeker_profiles', [
        'user_id' => $user->id,
    ]);
});

test('job seeker registration requires a name', function () {
    $response = $this->post('/register-job-seeker', [
        'name' => '', // Invalid
        'email' => 'test@test.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors('name');
    $this->assertGuest();
});

test('job seeker registration requires a valid email', function () {
    // Test with missing email
    $response = $this->post('/register-job-seeker', [
        'name' => 'John Doe',
        'email' => '', // Invalid
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);
    $response->assertSessionHasErrors('email');
    $this->assertGuest();
});

test('job seeker registration requires a password and confirmation', function () {
    // Test with missing password
    $response = $this->post('/register-job-seeker', [
        'name' => 'John Doe',
        'email' => 'test@test.com',
        'password' => '', // Invalid
        'password_confirmation' => '',
    ]);
    $response->assertSessionHasErrors('password');
    $this->assertGuest();
});

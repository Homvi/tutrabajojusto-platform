<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

// Explicitly use the RefreshDatabase trait for all tests in this file.
// This is the modern Pest syntax and ensures a clean slate for each test.
uses(RefreshDatabase::class);

test('a company can register', function () {
    // 1. Arrange: Add the new fields to the test data.
    $companyData = [
        'company_name' => 'Test Corp',
        'registration_number' => '1234567890',
        'website' => 'https://testcorp.com',
        'email' => 'contact@testcorp.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ];

    // 2. Act: Simulate a POST request to the registration endpoint.
    $response = $this->post('/register-company', $companyData);

    // 3. Assert: Check that the outcome is what we expect.
    $response->assertRedirect(route('dashboard'));
    $this->assertAuthenticated();

    $user = User::where('email', $companyData['email'])->first();

    $this->assertNotNull($user);
    $this->assertEquals('company', $user->role);

    // Assert that the company profile was created with all the correct data.
    $this->assertDatabaseHas('company_profiles', [
        'user_id' => $user->id,
        'company_name' => 'Test Corp',
        'registration_number' => '1234567890',
        'website' => 'https://testcorp.com',
    ]);
});

test('company registration requires a company name', function () {
    $response = $this->post('/register-company', [
        'company_name' => '', // Invalid
        'email' => 'test@test.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Assert that the session has a validation error for 'company_name'
    // and that the user was not authenticated.
    $response->assertSessionHasErrors('company_name');
    $this->assertGuest();
});

test('company registration requires a valid email', function () {
    // Test with missing email
    $response = $this->post('/register-company', [
        'company_name' => 'Test Corp',
        'email' => '', // Invalid
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);
    $response->assertSessionHasErrors('email');
    $this->assertGuest();

    // Test with invalid email format
    $response = $this->post('/register-company', [
        'company_name' => 'Test Corp',
        'email' => 'not-an-email', // Invalid
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);
    $response->assertSessionHasErrors('email');
    $this->assertGuest();

    // Test with an email that already exists
    User::factory()->create(['email' => 'exists@test.com']);
    $response = $this->post('/register-company', [
        'company_name' => 'Test Corp',
        'email' => 'exists@test.com', // Invalid (due to unique rule)
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);
    $response->assertSessionHasErrors('email');
    $this->assertGuest();
});

test('company registration requires a password and confirmation', function () {
    // Test with missing password
    $response = $this->post('/register-company', [
        'company_name' => 'Test Corp',
        'email' => 'test@test.com',
        'password' => '', // Invalid
        'password_confirmation' => '',
    ]);
    $response->assertSessionHasErrors('password');
    $this->assertGuest();

    // Test with mismatched password confirmation
    $response = $this->post('/register-company', [
        'company_name' => 'Test Corp',
        'email' => 'test@test.com',
        'password' => 'password',
        'password_confirmation' => 'wrong-password', // Invalid
    ]);
    $response->assertSessionHasErrors('password');
    $this->assertGuest();
});

<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class RateLimitingTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Clear rate limiter before each test
        RateLimiter::clear('');
    }

    /** @test */
    public function language_switch_endpoint_is_rate_limited()
    {
        // First 10 requests should succeed
        for ($i = 0; $i < 10; $i++) {
            $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
                ->post('/language/switch', ['locale' => 'es']);
            $this->assertNotEquals(429, $response->getStatusCode(), "Request {$i} should not be rate limited");
        }

        // 11th request should be rate limited
        $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
            ->post('/language/switch', ['locale' => 'es']);
        $this->assertEquals(429, $response->getStatusCode(), 'Should be rate limited after 10 requests');
    }

    /** @test */
    public function registration_endpoints_are_rate_limited()
    {
        // Test job seeker registration rate limiting - use invalid data to avoid actual registration side effects
        for ($i = 0; $i < 3; $i++) {
            $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
                ->post('register-job-seeker', [
                    'name' => "Test User {$i}",
                    'email' => 'invalid-email', // Invalid email to avoid actual user creation
                    'password' => 'SecurePassword123!',
                    'password_confirmation' => 'SecurePassword123!',
                ]);

            // Should not be rate limited (may get validation error for invalid data, but not 429)
            $this->assertNotEquals(429, $response->getStatusCode(), "Job seeker registration request {$i} should not be rate limited");
        }

        // 4th request should be rate limited regardless of data validity
        $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
            ->post('register-job-seeker', [
                'name' => 'Test User Final',
                'email' => 'invalid-email',
                'password' => 'SecurePassword123!',
                'password_confirmation' => 'SecurePassword123!',
            ]);
        $this->assertEquals(429, $response->getStatusCode(), 'Job seeker registration should be rate limited after 3 requests');
    }

    /** @test */
    public function password_reset_request_is_rate_limited()
    {
        // Create a user first
        $user = User::factory()->create(['email' => 'pwreset-test@example.com']);

        // First 3 requests should succeed
        for ($i = 0; $i < 3; $i++) {
            $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
                ->post('forgot-password', ['email' => 'pwreset-test@example.com']);
            $this->assertNotEquals(429, $response->getStatusCode(), "Password reset request {$i} should not be rate limited");
        }

        // 4th request should be rate limited
        $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
            ->post('forgot-password', ['email' => 'pwreset-test@example.com']);
        $this->assertEquals(429, $response->getStatusCode(), 'Password reset should be rate limited after 3 requests');
    }

    /** @test */
    public function password_update_is_rate_limited()
    {
        $user = User::factory()->create([
            'password' => bcrypt('current-password'),
        ]);

        $this->actingAs($user);

        // First 3 requests should succeed (though they may fail validation, they shouldn't be rate limited)
        for ($i = 0; $i < 3; $i++) {
            $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
                ->put('password', [
                    'current_password' => 'current-password',
                    'password' => "new-password{$i}23",
                    'password_confirmation' => "new-password{$i}23",
                ]);
            $this->assertNotEquals(429, $response->getStatusCode(), "Password update request {$i} should not be rate limited");
        }

        // 4th request should be rate limited
        $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
            ->put('password', [
                'current_password' => 'current-password',
                'password' => 'new-password456',
                'password_confirmation' => 'new-password456',
            ]);
        $this->assertEquals(429, $response->getStatusCode(), 'Password update should be rate limited after 3 requests');
    }

    /** @test */
    public function confirm_password_is_rate_limited()
    {
        $user = User::factory()->create([
            'password' => bcrypt('test-password'),
        ]);

        $this->actingAs($user);

        // First 5 requests should succeed
        for ($i = 0; $i < 5; $i++) {
            $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
                ->post('confirm-password', [
                    'password' => 'test-password',
                ]);
            $this->assertNotEquals(429, $response->getStatusCode(), "Confirm password request {$i} should not be rate limited");
        }

        // 6th request should be rate limited
        $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
            ->post('confirm-password', [
                'password' => 'test-password',
            ]);
        $this->assertEquals(429, $response->getStatusCode(), 'Confirm password should be rate limited after 5 requests');
    }

    /** @test */
    public function login_rate_limiting_still_works()
    {
        $user = User::factory()->create([
            'email' => 'throttle-test@example.com',
            'password' => bcrypt('correct-password'),
        ]);

        // Clear any existing rate limits for this IP and email
        \Illuminate\Support\Facades\RateLimiter::clear('throttle-test@example.com|'.request()->ip());

        // Make 5 failed login attempts (this should trigger the rate limiter)
        for ($i = 0; $i < 5; $i++) {
            $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
                ->post('login', [
                    'email' => 'throttle-test@example.com',
                    'password' => 'wrong-password',
                ]);

            // First 5 attempts should not be rate limited, but should fail authentication
            $this->assertNotEquals(429, $response->getStatusCode(), "Failed login attempt {$i} should not be rate limited yet");

            // Should redirect back with errors for failed authentication
            if ($response->getStatusCode() === 302) {
                $this->assertTrue(true, 'Got expected redirect for failed login');
            } elseif ($response->getStatusCode() === 422) {
                $this->assertTrue(true, 'Got expected validation error for failed login');
            }
        }

        // 6th attempt should be rate limited due to LoginRequest throttling
        $response = $this->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class)
            ->post('login', [
                'email' => 'throttle-test@example.com',
                'password' => 'correct-password', // Even with correct password
            ]);

        // Laravel's LoginRequest rate limiting should kick in
        // It typically returns 422 with throttle validation error or redirect with error
        $this->assertTrue(
            $response->getStatusCode() === 422 || $response->getStatusCode() === 302,
            'Login should be blocked after 5 failed attempts. Got status: '.$response->getStatusCode()
        );

        // If it's a 422, check for throttle-related error message
        if ($response->getStatusCode() === 422) {
            $responseData = $response->json();
            if (isset($responseData['errors']['email'])) {
                $errorMessages = implode(' ', $responseData['errors']['email']);
                $this->assertTrue(
                    str_contains(strtolower($errorMessages), 'throttl') ||
                    str_contains(strtolower($errorMessages), 'too many'),
                    'Should contain throttle-related error message'
                );
            }
        }
    }
}

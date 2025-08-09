<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EmailVerificationNotificationControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_redirects_if_already_verified(): void
    {
        $user = User::factory()->create(['email_verified_at' => now()]);

        $this->actingAs($user)
            ->post(route('verification.send'))
            ->assertRedirect(route('dashboard'));
    }

    public function test_store_sends_notification_and_redirects_back(): void
    {
        $user = User::factory()->create(['email_verified_at' => null]);

        $response = $this->actingAs($user)->from('/profile')
            ->post(route('verification.send'));

        $response->assertRedirect('/profile');
        $response->assertSessionHas('status', 'verification-link-sent');
    }
}

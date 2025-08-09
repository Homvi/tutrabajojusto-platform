<?php

namespace Tests\Feature\Middleware;

use App\Http\Middleware\IsAdminMiddleware;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class IsAdminMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Register a throwaway route protected by the middleware for testing
        Route::middleware([IsAdminMiddleware::class])->get('/_admin-probe', function () {
            return response('ok');
        });
    }

    public function test_non_admin_forbidden(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($user)
            ->get('/_admin-probe')
            ->assertStatus(403);
    }

    public function test_admin_allowed(): void
    {
        $user = User::factory()->create(['is_admin' => true]);

        $this->actingAs($user)
            ->get('/_admin-probe')
            ->assertOk();
    }
}

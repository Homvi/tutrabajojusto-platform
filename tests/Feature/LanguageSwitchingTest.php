<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class LanguageSwitchingTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_switch_language_to_spanish()
    {
        // Visit the landing page
        $response = $this->get('/');
        $response->assertStatus(200);

        // Switch to Spanish
        $response = $this->post('/language/switch', [
            'locale' => 'es',
        ]);

        $response->assertRedirect();

        // Verify the locale is set in session
        $this->assertEquals('es', session('locale'));
    }

    #[Test]
    public function it_can_switch_language_to_english()
    {
        // Set Spanish first
        session(['locale' => 'es']);

        // Switch to English
        $response = $this->post('/language/switch', [
            'locale' => 'en',
        ]);

        $response->assertRedirect();

        // Verify the locale is set in session
        $this->assertEquals('en', session('locale'));
    }

    #[Test]
    public function it_validates_locale_input()
    {
        // Try invalid locale
        $response = $this->post('/language/switch', [
            'locale' => 'invalid',
        ]);

        $response->assertSessionHasErrors('locale');
    }

    #[Test]
    public function it_requires_locale_parameter()
    {
        // No locale parameter
        $response = $this->post('/language/switch', []);

        $response->assertSessionHasErrors('locale');
    }
}

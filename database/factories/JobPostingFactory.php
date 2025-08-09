<?php

namespace Database\Factories;

use App\Models\CompanyProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobPosting>
 */
class JobPostingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraphs(3, true),
            'responsibilities' => $this->faker->paragraphs(2, true),
            'qualifications' => $this->faker->paragraphs(2, true),
            'type' => 'remote',
            'location' => $this->faker->city().', '.$this->faker->country(),
            'employment_type' => 'full-time',
            'salary_min' => $this->faker->numberBetween(30000, 150000),
            'salary_currency' => 'EUR',
            'salary_period' => 'yearly',
            'status' => 'draft',
            'published_at' => null,
            'company_profile_id' => CompanyProfile::factory(),
        ];
    }
}

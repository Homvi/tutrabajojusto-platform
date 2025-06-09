<?php

namespace Database\Factories;

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
            'type' => $this->faker->randomElement(['on-site', 'hybrid', 'remote']),
            'location' => $this->faker->city().', '.$this->faker->country(),
            'employment_type' => 'full-time',
            'salary_min' => $this->faker->numberBetween(50000, 120000) * 100, // Generates salary between 50k and 120k
            'salary_currency' => 'EUR',
            'salary_period' => 'yearly',
            'status' => 'draft',
            'published_at' => null,
        ];
    }
}

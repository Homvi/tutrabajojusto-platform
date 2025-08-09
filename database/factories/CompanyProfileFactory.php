<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompanyProfile>
 */
class CompanyProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'company_name' => $this->faker->company(),
            'website' => 'https://'.$this->faker->domainName(),
            'description' => $this->faker->paragraph(),
            'is_validated' => true,
            // Add a default registration number for tests
            'registration_number' => $this->faker->unique()->numerify('##########'),
        ];
    }
}

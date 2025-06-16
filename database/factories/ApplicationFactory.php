<?php

namespace Database\Factories;

use App\Models\CompanyProfile;
use App\Models\JobPosting;
use App\Models\JobSeekerProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // When creating a JobPosting, ensure its CompanyProfile has a valid User.
            'job_posting_id' => JobPosting::factory()->create([
                'company_profile_id' => CompanyProfile::factory()->create([
                    'user_id' => User::factory()->create(['role' => 'company'])->id,
                ]),
            ]),
            'job_seeker_profile_id' => JobSeekerProfile::factory(),
            'status' => 'submitted',
        ];
    }
}

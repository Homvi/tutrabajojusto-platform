<?php

namespace Database\Seeders;

use App\Models\CompanyProfile;
use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Database\Seeder;

class JobPostingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create 5 new company users, each with a company profile.
        $companies = User::factory()
            ->count(5)
            ->has(CompanyProfile::factory(), 'companyProfile')
            ->create(['role' => 'company']);

        // 2. Loop through each new company.
        foreach ($companies as $company) {
            // 3. For each company, create 4 job postings and set their status to 'published'.
            JobPosting::factory()
                ->count(4)
                ->create([
                    'company_profile_id' => $company->companyProfile->id,
                    'status' => 'published',
                    'published_at' => now(),
                ]);
        }
    }
}

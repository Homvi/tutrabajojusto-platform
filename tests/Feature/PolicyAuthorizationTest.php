<?php

namespace Tests\Feature;

use App\Models\Application;
use App\Models\CompanyProfile;
use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PolicyAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_company_user_cannot_view_other_company_job_posting(): void
    {
        $userA = User::factory()->create(['role' => 'company']);
        $companyA = CompanyProfile::factory()->create([
            'user_id' => $userA->getKey(),
        ]);

        $userB = User::factory()->create(['role' => 'company']);
        $companyB = CompanyProfile::factory()->create([
            'user_id' => $userB->getKey(),
        ]);

        $jobB = JobPosting::factory()->create([
            'company_profile_id' => $companyB->getKey(),
        ]);

        $this->actingAs($userA);

        $this->assertFalse($userA->can('view', $jobB));
    }

    public function test_company_user_can_view_own_application(): void
    {
        $user = User::factory()->create(['role' => 'company']);
        $company = CompanyProfile::factory()->create([
            'user_id' => $user->getKey(),
        ]);

        $job = JobPosting::factory()->create([
            'company_profile_id' => $company->getKey(),
        ]);

        $application = Application::factory()->create([
            'job_posting_id' => $job->getKey(),
        ]);

        $this->actingAs($user);

        $this->assertTrue($user->can('view', $application));
    }
}

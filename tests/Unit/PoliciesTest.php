<?php

namespace Tests\Unit;

use App\Models\Application;
use App\Models\CompanyProfile;
use App\Models\JobPosting;
use App\Models\User;
use App\Policies\ApplicationPolicy;
use App\Policies\JobPostingPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PoliciesTest extends TestCase
{
    use RefreshDatabase;

    public function test_job_posting_policy_view_update_delete(): void
    {
        $userA = User::factory()->create(['role' => 'company']);
        $companyA = CompanyProfile::factory()->create([
            'user_id' => $userA->getKey(),
        ]);

        $userB = User::factory()->create(['role' => 'company']);
        $companyB = CompanyProfile::factory()->create([
            'user_id' => $userB->getKey(),
        ]);

        $jobA = JobPosting::factory()->create([
            'company_profile_id' => $companyA->getKey(),
        ]);

        $jobB = JobPosting::factory()->create([
            'company_profile_id' => $companyB->getKey(),
        ]);

        $policy = new JobPostingPolicy;

        $this->assertTrue($policy->view($userA, $jobA));
        $this->assertFalse($policy->view($userA, $jobB));

        $this->assertTrue($policy->update($userA, $jobA));
        $this->assertFalse($policy->update($userA, $jobB));

        $this->assertTrue($policy->delete($userA, $jobA));
        $this->assertFalse($policy->delete($userA, $jobB));
    }

    public function test_application_policy_view_update(): void
    {
        $user = User::factory()->create(['role' => 'company']);
        $company = CompanyProfile::factory()->create([
            'user_id' => $user->getKey(),
        ]);
        $user->refresh(); // ensure relations cached

        $jobOwned = JobPosting::factory()->create([
            'company_profile_id' => $company->getKey(),
        ]);

        $jobOther = JobPosting::factory()->create();

        $appOwned = Application::factory()->create([
            'job_posting_id' => $jobOwned->getKey(),
        ]);

        $appOther = Application::factory()->create([
            'job_posting_id' => $jobOther->getKey(),
        ]);

        $policy = new ApplicationPolicy;

        $this->assertTrue($policy->view($user, $appOwned));
        $this->assertFalse($policy->view($user, $appOther));

        $this->assertTrue($policy->update($user, $appOwned));
        $this->assertFalse($policy->update($user, $appOther));
    }
}

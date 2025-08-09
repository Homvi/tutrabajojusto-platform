<?php

namespace Tests\Feature;

use App\Models\CompanyProfile;
use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class JobPostingTest extends TestCase
{
    use RefreshDatabase;

    private User $company;
    private CompanyProfile $companyProfile;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->company = User::factory()->create(['role' => 'company']);
        $this->companyProfile = CompanyProfile::factory()->create([
            'user_id' => $this->company->id,
            'is_validated' => true,
        ]);
    }

    #[Test]
    public function company_can_create_job_posting(): void
    {
        $jobData = [
            'title' => 'Senior Software Engineer',
            'description' => 'We are looking for a senior software engineer...',
            'responsibilities' => 'Lead development projects, mentor junior developers',
            'qualifications' => '5+ years experience, React, Laravel',
            'type' => 'remote',
            'location' => 'Remote',
            'employment_type' => 'full-time',
            'salary_min' => 80000,
            'salary_currency' => 'USD',
            'salary_period' => 'yearly',
        ];

        $response = $this->actingAs($this->company)
            ->post(route('jobs.store'), $jobData);

        $response->assertRedirect(route('dashboard'));
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('job_postings', [
            'title' => 'Senior Software Engineer',
            'company_profile_id' => $this->companyProfile->id,
            'salary_min' => 80000,
        ]);
    }

    #[Test]
    public function unvalidated_company_can_create_job_posting(): void
    {
        $this->companyProfile->update(['is_validated' => false]);

        $jobData = [
            'title' => 'Senior Software Engineer',
            'description' => 'We are looking for a senior software engineer...',
            'type' => 'remote',
            'employment_type' => 'full-time',
            'salary_min' => 80000,
            'salary_currency' => 'USD',
            'salary_period' => 'yearly',
        ];

        $response = $this->actingAs($this->company)
            ->post(route('jobs.store'), $jobData);

        $response->assertRedirect(route('dashboard'));
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('job_postings', [
            'title' => 'Senior Software Engineer',
            'company_profile_id' => $this->companyProfile->id,
            'salary_min' => 80000,
        ]);
    }

    #[Test]
    public function company_can_view_their_job_postings(): void
    {
        $jobPosting = JobPosting::factory()->create([
            'company_profile_id' => $this->companyProfile->id,
        ]);

        $response = $this->actingAs($this->company)
            ->get(route('jobs.index'));

        $response->assertOk();
        $response->assertInertia(fn ($assert) => $assert
            ->component('Job/Index')
            ->has('jobPostings')
            ->where('jobPostings.0.id', $jobPosting->id)
        );
    }

    #[Test]
    public function company_can_publish_job_posting(): void
    {
        $jobPosting = JobPosting::factory()->create([
            'company_profile_id' => $this->companyProfile->id,
            'status' => 'draft',
        ]);

        $response = $this->actingAs($this->company)
            ->patch(route('jobs.publish', $jobPosting));

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('job_postings', [
            'id' => $jobPosting->id,
            'status' => 'published',
        ]);
    }

    #[Test]
    public function company_can_delete_job_posting(): void
    {
        $jobPosting = JobPosting::factory()->create([
            'company_profile_id' => $this->companyProfile->id,
        ]);

        $response = $this->actingAs($this->company)
            ->delete(route('jobs.destroy', $jobPosting));

        $response->assertRedirect(route('jobs.index'));
        $response->assertSessionHas('success');

        $this->assertDatabaseMissing('job_postings', [
            'id' => $jobPosting->id,
        ]);
    }

    #[Test]
    public function only_validated_companies_jobs_are_publicly_visible(): void
    {
        // Create job from validated company
        $validJob = JobPosting::factory()->create([
            'company_profile_id' => $this->companyProfile->id,
            'status' => 'published',
        ]);

        // Create job from unvalidated company
        $unvalidatedCompanyUser = User::factory()->create(['role' => 'company']);
        $unvalidatedCompany = CompanyProfile::factory()->create([
            'user_id' => $unvalidatedCompanyUser->id,
            'is_validated' => false
        ]);
        $invalidJob = JobPosting::factory()->create([
            'company_profile_id' => $unvalidatedCompany->id,
            'status' => 'published',
        ]);

        $response = $this->get(route('jobs.public.index'));

        $response->assertOk();
        $response->assertInertia(fn ($assert) => $assert
            ->component('Public/Jobs/Index')
            ->has('jobPostings', 1)
            ->where('jobPostings.0.id', $validJob->id)
        );
    }

    #[Test]
    public function job_posting_requires_mandatory_fields(): void
    {
        $response = $this->actingAs($this->company)
            ->post(route('jobs.store'), []);

        $response->assertSessionHasErrors([
            'title',
            'description',
            'type',
            'employment_type',
            'salary_min',
            'salary_currency',
            'salary_period',
        ]);
    }

    #[Test]
    public function salary_must_be_positive_integer(): void
    {
        $jobData = [
            'title' => 'Test Job',
            'description' => 'Test description',
            'type' => 'remote',
            'employment_type' => 'full-time',
            'salary_min' => -1000, // Invalid negative salary
            'salary_currency' => 'USD',
            'salary_period' => 'yearly',
        ];

        $response = $this->actingAs($this->company)
            ->post(route('jobs.store'), $jobData);

        $response->assertSessionHasErrors(['salary_min']);
    }

    #[Test]
    public function job_posting_supports_search_functionality(): void
    {
        $job1 = JobPosting::factory()->create([
            'company_profile_id' => $this->companyProfile->id,
            'title' => 'React Developer',
            'status' => 'published',
        ]);

        $job2 = JobPosting::factory()->create([
            'company_profile_id' => $this->companyProfile->id,
            'title' => 'Laravel Developer',
            'status' => 'published',
        ]);

        $response = $this->get(route('jobs.public.index', ['search' => 'React']));

        $response->assertOk();
        $response->assertInertia(fn ($assert) => $assert
            ->component('Public/Jobs/Index')
            ->has('jobPostings')
            ->where('jobPostings.0.id', $job1->id)
        );
        
        // Verify that only the React job is returned
        $response->assertInertia(fn ($assert) => $assert
            ->component('Public/Jobs/Index')
            ->has('jobPostings', 1)
        );
    }

    #[Test]
    public function job_posting_supports_sorting_by_salary(): void
    {
        $lowSalaryJob = JobPosting::factory()->create([
            'company_profile_id' => $this->companyProfile->id,
            'salary_min' => 50000,
            'status' => 'published',
        ]);

        $highSalaryJob = JobPosting::factory()->create([
            'company_profile_id' => $this->companyProfile->id,
            'salary_min' => 100000,
            'status' => 'published',
        ]);

        $response = $this->get(route('jobs.public.index', ['sort' => 'salary_high_to_low']));

        $response->assertOk();
        $response->assertInertia(fn ($assert) => $assert
            ->component('Public/Jobs/Index')
            ->has('jobPostings', 2)
            ->where('jobPostings.0.id', $highSalaryJob->id)
        );
    }
}

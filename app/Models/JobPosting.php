<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobPosting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_profile_id',
        'title',
        'description',
        'responsibilities',
        'qualifications',
        'type',
        'location',
        'remote_policy',
        'employment_type',
        'start_date',
        'salary_min',
        'salary_currency',
        'salary_period',
        'application_deadline',
        'interview_rounds',
        'application_process_duration',
        'status',
        'published_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'application_deadline' => 'datetime',
        'published_at' => 'datetime',
    ];

    /**
     * Get the company profile that owns the job posting.
     */
    public function companyProfile(): BelongsTo
    {
        return $this->belongsTo(CompanyProfile::class);
    }

    /**
     * Get the applications for the job posting.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}

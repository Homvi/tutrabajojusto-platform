<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $job_posting_id
 * @property int $job_seeker_profile_id
 * @property string $status
 * @property JobPosting $jobPosting
 * @property JobSeekerProfile $jobSeekerProfile
 */
class Application extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'job_posting_id',
        'job_seeker_profile_id',
        'status',
    ];

    /**
     * Get the job posting that this application belongs to.
     */
    public function jobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }

    /**
     * Get the job seeker profile that this application belongs to.
     */
    public function jobSeekerProfile(): BelongsTo
    {
        return $this->belongsTo(JobSeekerProfile::class);
    }
}

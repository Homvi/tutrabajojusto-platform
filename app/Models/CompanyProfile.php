<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $user_id
 * @property string $company_name
 * @property string|null $website
 * @property string|null $registration_number
 * @property string|null $description
 * @property bool $is_validated
 * @property User $user
 * @property \Illuminate\Database\Eloquent\Collection<int, JobPosting> $jobPostings
 */
class CompanyProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'company_name',
        'website',
        'registration_number',
        'description',
        'is_validated',
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the job postings for the company profile.
     */
    public function jobPostings(): HasMany
    {
        return $this->hasMany(JobPosting::class);
    }
}

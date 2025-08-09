<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $user_id
 * @property string|null $headline
 * @property string|null $summary
 * @property string|null $skills
 * @property array<int, mixed>|null $experience
 * @property array<int, mixed>|null $education
 * @property User $user
 * @property \Illuminate\Database\Eloquent\Collection<int, Application> $applications
 */
class JobSeekerProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'headline',
        'summary',
        'skills',
        'experience',
        'education',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'experience' => 'array',
        'education' => 'array',
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the applications for the job seeker profile.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}

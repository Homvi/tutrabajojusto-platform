<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();

            // Foreign key for the job posting being applied to
            $table->foreignId('job_posting_id')->constrained()->onDelete('cascade');

            // Foreign key for the job seeker profile that is applying
            $table->foreignId('job_seeker_profile_id')->constrained()->onDelete('cascade');

            // This ensures a user can only apply to the same job once.
            $table->unique(['job_posting_id', 'job_seeker_profile_id']);

            // Add a status to track the application's progress
            $table->enum('status', ['submitted', 'viewed', 'shortlisted', 'rejected'])->default('submitted');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};

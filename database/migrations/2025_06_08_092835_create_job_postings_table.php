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
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();

            // Foreign key to the company profile
            $table->foreignId('company_profile_id')->constrained()->onDelete('cascade');

            $table->string('title');
            $table->text('description');
            $table->text('responsibilities')->nullable();
            $table->text('qualifications')->nullable();

            // Work Type and Location
            $table->enum('type', ['remote', 'hybrid', 'on-site'])->default('on-site');
            $table->string('location')->nullable(); // Required if not remote
            $table->string('remote_policy')->nullable(); // e.g., "EU Only", "Worldwide", "Country-specific"

            // Contract and Schedule
            $table->enum('employment_type', ['full-time', 'part-time', 'contract', 'internship'])->default('full-time');
            $table->date('start_date')->nullable();

            // Salary Information - As per the MVP, salary is key
            $table->integer('salary_min'); // Storing in cents to avoid float issues
            $table->string('salary_currency')->default('EUR');
            $table->enum('salary_period', ['monthly', 'yearly'])->default('yearly');

            // Application Process Details
            $table->timestamp('application_deadline')->nullable();
            $table->string('interview_rounds')->nullable(); // e.g., "3", "2-3"
            $table->string('application_process_duration')->nullable(); // e.g., "2-3 weeks"

            // Status and Timestamps
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};

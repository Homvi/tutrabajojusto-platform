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
        Schema::create('job_seeker_profiles', function (Blueprint $table) {
            $table->id();
            // Foreign key to the users table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Profile-specific fields based on MVP
            $table->string('headline')->nullable();
            $table->text('summary')->nullable();
            $table->text('skills')->nullable(); // Can be stored as JSON or comma-separated
            $table->json('experience')->nullable(); // Storing as JSON is flexible
            $table->json('education')->nullable(); // Storing as JSON is flexible

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_seeker_profiles');
    }
};

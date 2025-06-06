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
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->id();
            // Foreign key to the users table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Profile-specific fields based on MVP
            $table->string('company_name');
            $table->string('website')->nullable();
            $table->string('registration_number')->nullable(); // Or similar verification identifier
            $table->text('description')->nullable();
            $table->boolean('is_validated')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_profiles');
    }
};

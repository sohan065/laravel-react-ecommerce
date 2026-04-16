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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->decimal('discount', 8, 2); // flat amount or percent
            $table->enum('discount_type', ['fixed', 'percent'])->default('fixed');
            $table->decimal('min_purchase', 8, 2)->nullable();
            $table->unsignedInteger('usage_count')->default(0); // how many times it's used
            $table->unsignedInteger('usage_limit')->nullable(); // max times it can be used
            $table->dateTime('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};

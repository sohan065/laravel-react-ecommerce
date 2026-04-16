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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->double('subtotal', 10, 2);
            $table->double('grand_total', 10, 2);
            $table->double('shipping', 10, 2)->default(0);
            $table->double('discount', 10, 2)->default(0);
            $table->enum('payment_status', ['paid', 'not paid'])->default('not paid');
            $table->enum('order_status', ['pending', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('mobile');
            $table->string('address');
            $table->string('city');
            $table->string('state')->nullable();
            $table->string('zip')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
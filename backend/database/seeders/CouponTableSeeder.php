<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CouponTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('coupons')->insert([
            [
                'code' => 'WELCOME10',
                'discount' => 10,
                'discount_type' => 'percent',
                'min_purchase' => 100,
                'usage_count' => 0,
                'usage_limit' => 1, // e.g. max 100 uses
                'expires_at' => Carbon::now()->addDays(30),
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'FLAT50',
                'discount' => 50,
                'discount_type' => 'fixed',
                'min_purchase' => 200,
                'usage_count' => 0,
                'usage_limit' => 50, // e.g. max 50 uses
                'expires_at' => Carbon::now()->addDays(10),
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'code' => 'FREESHIP',
                'discount' => 20,
                'discount_type' => 'fixed',
                'min_purchase' => 50,
                'usage_count' => 0,
                'usage_limit' => null, // unlimited usage
                'expires_at' => Carbon::now()->addDays(15),
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}

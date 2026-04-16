<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ShippingChargesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shipping_charges')->insert([
            ['area_name' => 'Inside Dhaka', 'charge' => 60.00],
            ['area_name' => 'Outside Dhaka', 'charge' => 120.00],
        ]);
    }
}

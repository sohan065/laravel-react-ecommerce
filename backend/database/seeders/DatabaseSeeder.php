<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\SizeTableSeeder;
use Database\Seeders\UserTableSeeder;
use Database\Seeders\BrandTableSeeder;
use Database\Seeders\CouponTableSeeder;
use Database\Seeders\CategoryTableSeeder;
use Database\Seeders\ShippingChargesTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(UserTableSeeder::class);
        $this->call(BrandTableSeeder::class);
        $this->call(CategoryTableSeeder::class);
        $this->call(SizeTableSeeder::class);
        $this->call(ShippingChargesTableSeeder::class);
        $this->call(CouponTableSeeder::class);
    }
}

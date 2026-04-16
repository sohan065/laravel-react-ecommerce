<?php

namespace App\Repositories\Eloquent;

use App\Models\Coupon;
use App\Repositories\Contracts\CouponRepositoryInterface;

class CouponRepository implements CouponRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return Coupon::all();
    }

    public function create(array $data): ?Coupon
    {
        return Coupon::create($data);
    }

    public function update(array $data, int $id): int
    {
        return Coupon::where('id', $id)->update($data);
    }

    public function delete(int $id): bool
    {
        return Coupon::destroy($id) > 0;
    }

    public function find(int $id): ?Coupon
    {
        return Coupon::find($id);
    }
}

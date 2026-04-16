<?php

namespace App\Repositories\Contracts;

use App\Models\Coupon;

interface CouponRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection;

    public function create(array $data): ?Coupon;

    public function update(array $data, int $id): int;

    public function delete(int $id): bool;

    public function find(int $id): ?Coupon;
}

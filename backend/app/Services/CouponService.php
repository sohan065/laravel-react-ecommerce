<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;
use App\Repositories\Contracts\CouponRepositoryInterface;

class CouponService
{
    private CouponRepositoryInterface $couponRepository;

    public function __construct(CouponRepositoryInterface $couponRepository)
    {
        $this->couponRepository = $couponRepository;
    }

    public function getAllCoupons()
    {
        return $this->couponRepository->all();
    }

    public function createCoupon(array $data)
    {
        // Example: validate before creating
        $validator = Validator::make($data, [
            'code' => 'required|string|unique:coupons,code',
            'discount' => 'required|numeric|min:1',
            'expiry_date' => 'nullable|date|after:today',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        return $this->couponRepository->create($data);
    }

    public function updateCoupon(array $data, int $id)
    {
        return $this->couponRepository->update($data, $id);
    }

    public function deleteCoupon(int $id)
    {
        return $this->couponRepository->delete($id);
    }

    public function findCoupon(int $id)
    {
        return $this->couponRepository->find($id);
    }
}

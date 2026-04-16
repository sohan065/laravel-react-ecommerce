<?php

namespace App\Http\Controllers\Front;

use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Services\CouponService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CouponController extends Controller
{
    private CouponService $couponService;

    public function __construct(CouponService $couponService)
    {
        $this->couponService = $couponService;
    }

    public function apply(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'code' => 'required|string|exists:coupons,code',
            'subtotal' => 'required|numeric',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Invalid Coupon Code',
                'errors' => $validate->errors(),
            ], 422);
        }

        $coupon = Coupon::where('code', $request->code)
            ->where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')->orWhere('expires_at', '>', now());
            })->first();

        if (!$coupon) {
            return response()->json([
                'status' => 404,
                'error' => 'Invalid or expired coupon.',
            ], 404);
        }

        if ($coupon->usage_limit !== null && $coupon->usage_count >= $coupon->usage_limit) {
            return response()->json([
                'status' => 400,
                'error' => 'Coupon usage limit reached.',
            ], 400);
        }

        if ($coupon->min_purchase && $request->subtotal < $coupon->min_purchase) {
            return response()->json([
                'status' => 400,
                'error' => 'Minimum purchase amount not met.',
            ], 400);
        }

        $discountAmount = $coupon->discount_type === 'percent'
            ? ($request->subtotal * $coupon->discount / 100)
            : $coupon->discount;

        return response()->json([
            'status' => 200,
            'message' => 'Coupon applied successfully.',
            'discount' => round($discountAmount, 2),
            'coupon' => $coupon->code,
            'discount_type' => $coupon->discount_type,
            'discount_value' => $coupon->discount,
        ]);
    }
    public function index()
    {
        // $coupons = Coupon::all();
        $coupons = $this->couponService->getAllCoupons();
        return response()->json([
            'status' => 200,
            'data' => $coupons,
            'message' => 'Coupons retrieved successfully!'
        ], 200);
    }
    public function show($id)
    {
        $coupon = Coupon::find($id);
        if (!$coupon) {
            return response()->json([
                'status' => 404,
                'message' => 'Coupon not found!'
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $coupon,
            'message' => 'Coupon retrieved successfully!'
        ], 200);
    }
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'code' => 'required|string|unique:coupons,code',
            'discount' => 'required|numeric|min:0',
            'discount_type' => 'required|in:percent,fixed',
            'min_purchase' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation error',
                'errors' => $validate->errors(),
            ], 422);
        }

        $coupon = Coupon::create($request->all());
        return response()->json([
            'status' => 201,
            'data' => $coupon,
            'message' => 'Coupon created successfully!'
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'code' => 'required|string|unique:coupons,code,' . $id,
            'discount' => 'required|numeric|min:0',
            'discount_type' => 'required|in:percent,amount',
            'min_purchase' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation error',
                'errors' => $validate->errors(),
            ], 422);
        }

        $coupon = Coupon::find($id);
        if (!$coupon) {
            return response()->json([
                'status' => 404,
                'message' => 'Coupon not found!'
            ], 404);
        }

        $coupon->update($request->all());
        return response()->json([
            'status' => 200,
            'data' => $coupon,
            'message' => 'Coupon updated successfully!'
        ], 200);
    }
    public function destroy($id)
    {
        $coupon = Coupon::find($id);
        if (!$coupon) {
            return response()->json([
                'status' => 404,
                'message' => 'Coupon not found!'
            ], 404);
        }

        $coupon->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Coupon deleted successfully!'
        ], 200);
    }
}

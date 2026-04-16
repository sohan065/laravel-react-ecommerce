<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Coupon;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'mobile' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip' => 'nullable|string|max:20',
            'subtotal' => 'required|numeric|min:0',
            'grand_total' => 'required|numeric|min:0',
            'shipping' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'couponCode' => 'nullable|string|min:0',
            'payment_status' => 'required|in:paid,not paid',
            'order_status' => 'required|in:pending,shipped,delivered,cancelled'
        ]);

        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()], 422);
        }

        DB::beginTransaction();

        try {
            $order = new Order();
            $order->user_id = Auth::id();
            $order->name = $request->name;
            $order->email = $request->email;
            $order->mobile = $request->mobile;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->state = $request->state;
            $order->zip = $request->zip;
            $order->subtotal = $request->subtotal;
            $order->grand_total = $request->grand_total;
            $order->shipping = $request->shipping ?? 0;
            $order->discount = $request->discount ?? 0;
            $order->payment_status = $request->payment_status;
            $order->order_status = $request->order_status;
            $order->save();

            if ($request->has('cart') && is_array($request->cart)) {
                foreach ($request->cart as $item) {
                    $itemValidate = Validator::make($item, [
                        'product_id' => 'required|exists:products,id',
                        'title' => 'required|string|max:255',
                        'size' => 'nullable|string|max:50',
                        'price' => 'required|numeric|min:0',
                        'qty' => 'required|integer|min:1',
                        'unit_price' => 'required|numeric|min:0'
                    ]);

                    if ($itemValidate->fails()) {
                        DB::rollBack();
                        return response()->json(['errors' => $itemValidate->errors()], 422);
                    }

                    $orderItem = new OrderItem();
                    $orderItem->order_id = $order->id;
                    $orderItem->product_id = $item['product_id'];
                    $orderItem->name = $item['title'];
                    $orderItem->size = $item['size'] ?? null;
                    $orderItem->price = $item['price'] * $item['qty'];
                    $orderItem->qty = $item['qty'];
                    $orderItem->unit_price = $item['unit_price'];
                    $orderItem->save();
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Order saved successfully',
                'order_id' => $order->id,
                'status' => 201
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
    }
    public function getOrderDetails($id)
    {
        $order = Order::with('items.product')->find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json([
            'data' => $order,
            'status' => 200
        ], 200);
    }
    public function getUserOrders()
    {
        $orders = Order::with('items.product')->where('user_id', Auth::id())->get();

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'No orders found'], 404);
        }

        return response()->json([
            'data' => $orders,
            'status' => 200
        ], 200);
    }

    public function getCouponDiscount($couponCode, $subtotal)
    {
        $coupon = Coupon::where('code', $couponCode)
            ->where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')->orWhere('expires_at', '>', now());
            })->first();

        if (!$coupon) {
            return response()->json(['error' => 'Invalid or expired coupon'], 404);
        }

        if ($coupon->usage_limit !== null && $coupon->usage_count >= $coupon->usage_limit) {
            return response()->json(['error' => 'Coupon usage limit reached'], 400);
        }

        if ($coupon->min_purchase && $subtotal < $coupon->min_purchase) {
            return response()->json(['error' => 'Minimum purchase amount not met'], 400);
        }

        $discountAmount = $coupon->discount_type === 'percent'
            ? ($subtotal * $coupon->discount / 100)
            : $coupon->discount;

        return $discountAmount;
    }
}

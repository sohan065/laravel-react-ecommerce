<?php

namespace App\Http\Controllers\Admin\Order;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items.product')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'Orders retrieved successfully.',
            'status' => 200
        ], 200);
    }

    public function show($id)
    {
        $order = Order::with('items.product')->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order retrieved successfully.',
            'status' => 200
        ], 200);
    }
    public function updateStatus($id, Request $request)
    {
        $order = Order::findOrFail($id);
        $order->payment_status = $request->input('payment_status');
        $order->order_status = $request->input('order_status');
        $order->save();

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order status updated successfully.',
            'status' => 200
        ], 200);
    }
}

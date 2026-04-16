<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;
use App\Models\ShippingCharge;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ShippingController extends Controller
{
    public function index()
    {
        $shippingCharges = ShippingCharge::all();
        return response()->json([
            'status' => 200,
            'data' => $shippingCharges,
            'message' => 'Shipping charges retrieved successfully!'
        ], 200);
    }
    public function show($id)
    {
        $shippingCharge = ShippingCharge::find($id);
        if (!$shippingCharge) {
            return response()->json([
                'status' => 404,
                'message' => 'Shipping charge not found!'
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $shippingCharge,
            'message' => 'Shipping charge retrieved successfully!'
        ], 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'area_name' => 'required|string|max:255',
            'charge' => 'required|numeric|min:0',
        ]);

        $shippingCharge = ShippingCharge::create([
            'area_name' => $request->area_name,
            'charge' => $request->charge,
        ]);

        return response()->json([
            'status' => 201,
            'data' => $shippingCharge,
            'message' => 'Shipping charge created successfully!'
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'area_name' => 'required|string|max:255',
            'charge' => 'required|numeric|min:0',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation error',
                'errors' => $validate->errors(),
            ], 422);
        }
        $shippingCharge = ShippingCharge::find($id);
        if (!$shippingCharge) {
            return response()->json([
                'status' => 404,
                'message' => 'Shipping charge not found!'
            ], 404);
        }

        $shippingCharge->update([
            'area_name' => $request->area_name,
            'charge' => $request->charge,
        ]);

        return response()->json([
            'status' => 200,
            'data' => $shippingCharge,
            'message' => 'Shipping charge updated successfully!'
        ], 200);
    }

    public function destroy($id)
    {
        $shippingCharge = ShippingCharge::find($id);
        if (!$shippingCharge) {
            return response()->json([
                'status' => 404,
                'message' => 'Shipping charge not found!'
            ], 404);
        }

        $shippingCharge->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Shipping charge deleted successfully!'
        ], 200);
    }
}

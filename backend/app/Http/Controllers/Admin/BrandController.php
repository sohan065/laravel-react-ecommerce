<?php

namespace App\Http\Controllers\Admin;

use App\Models\Brand;
use App\Http\Controllers\Controller;
use App\Http\Requests\Brand\StoreBrandRequest;
use App\Http\Requests\Brand\UpdateBrandRequest;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'data' => $brands,
            'status' => 200,
            'message' => 'Brands retrieved successfully'
        ], 200);
    }

    public function show($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found'
            ], 404);
        }
        return response()->json([
            'data' => $brand,
            'status' => 200,
            'message' => 'Brand retrieved successfully'
        ], 200);
    }

    public function store(StoreBrandRequest $request)
    {
        $brand = Brand::create($request->validated());
        return response()->json([
            'data' => $brand,
            'status' => 201,
            'message' => 'Brand created successfully'
        ], 201);
    }

    public function update(UpdateBrandRequest $request, $id)
    {

        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found'
            ], 404);
        }

        $brand->update($request->validated());

        return response()->json([
            'data' => $brand,
            'status' => 200,
            'message' => 'Brand updated successfully!'
        ], 200);
    }

    public function destroy($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found'
            ], 404);
        }

        $brand->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Brand deleted successfully'
        ], 200);
    }
}

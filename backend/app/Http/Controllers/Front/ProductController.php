<?php

namespace App\Http\Controllers\Front;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function getLatestProducts()
    {
        $products = Product::where('status', true)->with('product_images', 'product_sizes')->orderBy('created_at', 'desc')->take(4)->get();
        return response()->json([
            'status' => 200,
            'data' => $products,
            'message' => 'Latest Product retrieved successfully!'
        ]);
    }
    public function getFeaturedProducts()
    {
        $products = Product::where('is_featured', true)->where('status', true)->with('product_images', 'product_sizes')->orderBy('created_at', 'desc')->take(8)->get();
        return response()->json([
            'status' => 200,
            'data' => $products,
            'message' => 'Featured Product retrieved successfully!'
        ]);
    }

    public function getCategories()
    {
        $categories = Category::where('status', true)->get();

        return response()->json([
            'status' => 200,
            'data' => $categories,
            'message' => 'Categories retrieved successfully'
        ], 200);
    }

    public function getBrands()
    {
        $brands = Brand::where('status', true)->get();

        return response()->json([
            'status' => 200,
            'data' => $brands,
            'message' => 'Brands retrieved successfully'
        ], 200);
    }

    public function getProducts(Request $request)
    {
        $products = Product::with('product_images', 'product_sizes.size')->where('status', true);
        // products filter by categories
        if (!empty($request->categories)) {
            $catArray = explode(',', $request->categories);
            $products->whereIn('category_id', $catArray);
        }

        // products filter by brands 
        if (!empty($request->brands)) {
            $brandArray = explode(',', $request->brands);
            $products->whereIn('brand_id', $brandArray);
        }

        $products = $products->get();

        return response()->json([
            'status' => 200,
            'data' => $products,
            'message' => 'Products retrieved successfully'
        ], 200);
    }

    public function getProductDetails($id)
    {
        $product = Product::with('product_images', 'product_sizes.size')->find($id);
        if ($product) {
            return response()->json([
                'status' => 200,
                'data' => $product,
                'message' => 'Product details retrieved successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }
    }
}
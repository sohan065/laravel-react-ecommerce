<?php

namespace App\Http\Controllers\Admin;

use App\Models\Size;
use App\Models\Product;
use App\Models\TempImage;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use App\Models\ProductImage;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('product_images', 'product_sizes.size')->get();

        return response()->json([
            'status' => 200,
            'data' => $products,
            'message' => 'Products retrieved successfully'
        ], 200);
    }

    public function store(Request $request)
    {
        // Code to store a new product
        $validate = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'compare_price' => 'nullable|numeric',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'image_id' => 'nullable|array',
            'image_id.*' => 'numeric|exists:temp_images,id',
            'size_id' => 'nullable|array',
            'size_id.*' => 'numeric|exists:sizes,id',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'qty' => 'required|integer|min:0',
            'sku' => 'nullable|string|max:255|unique:products,sku',
            'barcode' => 'nullable|string|max:255|unique:products,barcode',
            'is_featured' => 'nullable|boolean',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validate->errors(),
                'message' => 'Validation failed'
            ], 422);
        }
        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->qty = $request->qty;
        $product->sku = $request->sku;
        $product->barcode = $request->barcode;
        $product->status = $request->status ?? 1;
        $product->is_featured = $request->is_featured ?? 0;
        $product->save();

        $image_id = $request->image_id;

        if (!empty($image_id)) {
            foreach ($image_id as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);
                $imageArray = explode('.', $tempImage->name);
                $ext = end($imageArray);
                $imageName = $product->id . '-' . time() . '-' . uniqid() . '.' . $ext;
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destinationPath = public_path('uploads/products/large/' . $imageName);
                File::copy($sourcePath, $destinationPath);

                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->image = $imageName;
                $productImage->save();

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->update();
                }
            }
        }

        $sizeIds = $request->input('size_id');
        if (!empty($sizeIds)) {
            foreach ($sizeIds as $sizeId) {
                ProductSize::create([
                    'product_id' => $product->id,
                    'size_id' => $sizeId
                ]);
            }
        }

        return response()->json([
            'status' => 201,
            'data' => $product,
            'message' => 'Product created successfully'
        ], 201);
    }

    public function show($id)
    {
        // Code to show a specific product
        $product = Product::with('product_images', 'product_sizes.size')->find($id);
        $product_sizes = $product->product_sizes()->pluck('size_id');
        if ($product) {
            return response()->json([
                'status' => 200,
                'data' => $product,
                'product_sizes' => $product_sizes,
                'message' => 'Product retrieved successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'compare_price' => 'nullable|numeric',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'image_id' => 'nullable|array',
            'image_id.*' => 'numeric|exists:temp_images,id',
            'size_id' => 'nullable|array',
            'size_id.*' => 'numeric|exists:sizes,id',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'qty' => 'required|integer|min:0',
            'sku' => 'nullable|string|max:255|unique:products,sku,' . $id,
            'barcode' => 'nullable|string|max:255|unique:products,barcode,' . $id,
            'is_featured' => 'required|boolean',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validate->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $product = Product::with('product_images')->find($id);
        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }

        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->qty = $request->qty;
        $product->sku = $request->sku;
        $product->barcode = $request->barcode;
        $product->status = $request->status ?? 1;
        $product->is_featured = $request->is_featured ?? 0;
        $product->save();

        $image_id = $request->image_id;
        if (!empty($image_id)) {
            foreach ($image_id as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);
                $imageArray = explode('.', $tempImage->name);
                $ext = end($imageArray);
                $imageName = $product->id . '-' . time() . '-' . uniqid() . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destinationPath = public_path('uploads/products/large/' . $imageName);
                File::copy($sourcePath, $destinationPath);

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->update();
                }
            }
        }

        $sizeIds = $request->input('size_id');
        if (!empty($sizeIds)) {
            ProductSize::where('product_id', $product->id)->delete();
            foreach ($sizeIds as $sizeId) {
                ProductSize::create([
                    'product_id' => $product->id,
                    'size_id' => $sizeId
                ]);
            }
        }


        return response()->json([
            'status' => 200,
            'data' => $product,
            'message' => 'Product updated successfully'
        ], 200);
    }

    public function destroy($id)
    {
        // Code to delete a specific product
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Product deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }
    }

    public function uploadProductImage(Request $request, $productId)
    {

        $validate = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validate->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $productImage = ProductImage::create([
            'product_id' => $productId,
            'image' => 'Dummy image',
        ]);

        $image = $request->file('image');
        $name = time() . '.' . $image->getClientOriginalExtension();
        $path = public_path('uploads/products/large/');
        $image->move($path, $name);


        $productImage->update(['image' => $name]);

        return response()->json([
            'status' => 200,
            'message' => 'Image uploaded successfully',
            'data' => $productImage
        ]);
    }

    public function deleteProductImage($id)
    {
        $productImage = ProductImage::find($id);

        if ($productImage) {
            $imagePath = public_path('uploads/products/large/' . $productImage->image);

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            $productImage->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Product image deleted successfully'
            ]);
        }

        return response()->json([
            'status' => 404,
            'message' => 'Product image not found'
        ], 404);
    }

    public function setDefaultImage(Request $request, $id)
    {

        $validate = Validator::make($request->all(), [
            'image' => 'required|string',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validate->errors(),
                'message' => 'Validation failed'
            ], 422);
        }
        $product = Product::find($id);
        $product->image = $request->input('image');
        $product->update();
        return response()->json([
            'status' => 200,
            'message' => 'Image set successfully',
        ]);
    }

    public function getProductSizes()
    {
        $sizes = Size::get();
        return response()->json([
            'status' => 200,
            'data' => $sizes,
            'message' => 'Size retrieved successfully'
        ], 200);
    }

    public function storeProductSizes(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'product_id' => 'bail|required|exists:products,id',
            'size_id' => 'required|array',
            'size_id.*' => 'numeric|exists:sizes,id',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validate->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $sizeIds = $request->input('size_id');

        $product_id = $request->input('product_id');


        if (!empty($sizeIds)) {
            ProductSize::where('product_id', $product_id)->delete();
            foreach ($sizeIds as $sizeId) {
                ProductSize::create([
                    'product_id' => $product_id,
                    'size_id' => $sizeId
                ]);
            }
        }

        return response()->json([
            'status' => 200,
            'data' => '',
            'message' => 'Product sizes store successfully'
        ], 200);
    }
}

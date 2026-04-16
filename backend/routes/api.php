<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Front\CouponController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Front\AccountController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Front\ShippingController;
use App\Http\Controllers\Admin\TempImageController;
use App\Http\Controllers\Front\ProductController as FrontProductController;
use App\Http\Controllers\Admin\Order\OrderController as AdminOrderController;


Route::get('products/latest', [FrontProductController::class, 'getLatestProducts']);
Route::get('products/featured', [FrontProductController::class, 'getFeaturedProducts']);

Route::get('products/categories', [FrontProductController::class, 'getCategories']);
Route::get('products/brands', [FrontProductController::class, 'getBrands']);
Route::get('get-products', [FrontProductController::class, 'getProducts']);
Route::get('get-products/{id}', [FrontProductController::class, 'getProductDetails']);

Route::post('admin/login', [AuthController::class, 'authenticate']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::resource('categories', CategoryController::class);
    Route::resource('brands', BrandController::class);
    Route::post('temp-image', [TempImageController::class, 'uploadTempImage']);
    Route::resource('products', ProductController::class);
    Route::post('product/image/upload/{productId}', [ProductController::class, 'uploadProductImage']);
    Route::delete('product/image/delete/{id}', [ProductController::class, 'deleteProductImage']);
    Route::post('product/image/default/{id}', [ProductController::class, 'setDefaultImage']);
    Route::get('product/sizes', [ProductController::class, 'getProductSizes']);
    Route::post('product/sizes', [ProductController::class, 'storeProductSizes']);

    Route::get('orders', [AdminOrderController::class, 'index']);
    Route::get('orders/{id}', [AdminOrderController::class, 'show']);
    Route::post('order/status/update/{id}', [AdminOrderController::class, 'updateStatus']);
});

Route::post('register', [AccountController::class, 'register']);
Route::post('login', [AccountController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum', 'checkUserRole']], function () {
    Route::post('save-order', [OrderController::class, 'saveOrder']);
    Route::get('user/orders/{id}', [OrderController::class, 'getOrderDetails']);
    Route::get('user/orders', [OrderController::class, 'getUserOrders']);
});

Route::resource('shipping-charge', ShippingController::class);

Route::post('apply-coupon', [CouponController::class, 'apply']);
Route::resource('coupon', CouponController::class);

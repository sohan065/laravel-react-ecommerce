<?php

namespace App\Http\Controllers\Admin;

use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

// use Intervention\Image\ImageManager;
// use Intervention\Image\Drivers\Imagick\Driver;

class TempImageController extends Controller
{
    public function uploadTempImage(Request $request)
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
        $tempImage = TempImage::create([
            'name' => 'Dummy image',
        ]);

        $image = $request->file('image');
        $name = time() . '.' . $image->getClientOriginalExtension();

        // First move
        $path = public_path('uploads/temp');
        $image->move($path, $name);

        // Then copy to second location
        copy($path . '/' . $name, public_path('uploads/temp/thumbnail/' . $name));


        // create new manager instance with desired driver
        // $manager = new ImageManager(new Driver());
        // open the image
        // $tempImagePath = public_path('uploads/temp/' . $name);
        // $image = $manager->read($tempImagePath);
        // $image->scaleDown(width: 200);
        // $image->save(public_path('uploads/temp/thumbnail' . $name));

        $tempImage->update(['name' => $name]);

        return response()->json([
            'status' => 200,
            'message' => 'Image uploaded successfully',
            'data' => $tempImage
        ]);
    }
}
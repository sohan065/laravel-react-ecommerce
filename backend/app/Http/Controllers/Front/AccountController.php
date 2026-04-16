<?php

namespace App\Http\Controllers\Front;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation error',
                'errors' => $validate->errors(),
            ], 422);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->role = 'user'; // Default role for front-end users
        $user->save();
        return response()->json([
            'status' => 201,
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }
    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validate->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation error',
                'errors' => $validate->errors(),
            ], 422);
        }
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = User::find(Auth::id());
            if ($user->role == 'user') {
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'message' => 'Login successful as user',
                    'token' => $token,
                    'id' => $user->id,
                    'name' => $user->name,
                    'status' => 200,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'You are not authorized to access user panel',
                    'status' => 401,
                ], 401);
            }
            // $user = User::find(Auth::id());
            // $token = $user->createToken('token')->plainTextToken;
            // return response()->json([
            //     'message' => 'Login successful as user',
            //     'token' => $token,
            //     'id' => $user->id,
            //     'name' => $user->name,
            //     'status' => 200,
            // ], 200);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid credentials',
            ], 401);
        }
    }
}

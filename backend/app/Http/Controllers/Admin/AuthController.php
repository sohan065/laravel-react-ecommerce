<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = User::find(Auth::id());
            if ($user->role == 'admin') {
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'message' => 'Login successful as admin',
                    'token' => $token,
                    'id' => $user->id,
                    'name' => $user->name,
                    'status' => 200,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'You are not authorized to access admin panel',
                    'status' => 401,
                ], 401);
            }
        } else {
            return response()->json([
                'message' => 'Invalid credentials',
                'status' => 401,
            ], 401);
        }
    }
}

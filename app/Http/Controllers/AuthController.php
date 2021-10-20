<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class AuthController extends Controller
{
    public function logIn(Request $request)
    {
        $request->validate(
            [
                'student_number'    => 'required|string',
                'password' => 'required|string',
            ]
        );
        // روند آوث کردن اینه که چیزی که کاربر وارد کرده رو بفرسته به ای پی آی و اون چک کنه ببینه درسته یا نه
        if (Auth::guard()->attempt($request->only('student_number', 'password'))) {
            $request->session()->regenerate();
            $user_id = Auth::user()->id;
            $user = User::find($user_id,['name','last_name','student_number']);
            return $user;
        }

        
        return response()->json(['error' =>'invalid credentials']);
    }
        

    public function logOut(Request $request)
    {
        Auth::guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([], 204);
    }

    public function logIndeveloper(Request $request)
    {
        $request->validate(
            [
                'student_number'    => 'required|string',
                'password' => 'required|string',
            ]
        );
        // روند آوث کردن اینه که چیزی که کاربر وارد کرده رو بفرسته به ای پی آی و اون چک کنه ببینه درسته یا نه
        if (Auth::guard()->attempt($request->only('student_number', 'password'))) {
            $user_id = Auth::user()->id;
            $user = User::find($user_id,['name','last_name','student_number']);
            return $user;
        }

        
        return response()->json(['error' =>'invalid credentials']);
    }
}

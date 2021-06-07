<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/showprofile',[App\Http\Controllers\api\userController::class,'show'])->middleware('auth:');
Route::post('/register',[App\Http\Controllers\api\userController::class,'create']);
Route::post('/profilesubmit',[App\Http\Controllers\api\userController::class,'edit']);
Route::post('/deleteaccount',[App\Http\Controllers\api\userController::class,'destroy']);

// Route::post('/passwordreset',somewhere,'passwordrest'])->name('password.reset');
// you should still define a route named password.reset that is responsible for displaying your application's "reset password" view. This is necessary because Laravel's Illuminate\Auth\Notifications\ResetPassword notification will generate the password reset URL via the password.reset named route.


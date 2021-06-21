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

// test , this route addes user to users table whitch we will get from golestan later
// the function must change after connecting to golestan
Route::post('/register',[App\Http\Controllers\api\userController::class,'create']);

// in my app
// نمیشه از ای پی آی برای یارو توی فرانت تعیین تکلیف کنی فقط میشه بگی اینجوری شد بعد اگه اینجوری بود، تو همون فرانت ریدایرکتش کنی
Route::post('/profilesubmit',[App\Http\Controllers\submitted_users_Controller::class,'create'])->middleware('checksubmituser');
Route::post('/signupcheck',[App\Http\Controllers\submitted_users_Controller::class,'signupcheck']);
Route::post('/newgrade',[App\Http\Controllers\lessonsController::class,'newgrade']);

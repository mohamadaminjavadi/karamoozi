<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Models\submitted_users;

use Illuminate\Http\Request;
use App\Http\Requests\createUser;
use Auth;


class userController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data= User::all();
        return $data;
    }

    public function userData(){
        $user_id = Auth::user()->id;
        $user = User::find($user_id,['name','last_name','address','student_number']);
        return $user;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $user = new User;
        $user_id = User::fillUser($request, $user);
        return response()->json([
            'success' =>true,
            'user' => $user_id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show(Request $request)
    // {
    //     $id = Auth::user()->id;
    //     $user = User::find($id);
    //     return $user;
    // } به یک کنترلر دیگر برای یک مدل دیگر که اطلاعات ثبت شده توسط کاربر را دارد اضافه شود



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        User::find(Auth::user()->id)->delete();
        return response()->json([
            'success'=>true,
        ]);
    }
}

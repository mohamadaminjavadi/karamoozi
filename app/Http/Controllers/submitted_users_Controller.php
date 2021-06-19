<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\submitted_users;
use App\Http\Requests\CSU;
class submitted_users_Controller extends Controller
{
    // CSU = create submitted user
    public function create(CSU $request)
    {
        $user=new submitted_users;
        $user_id=submitted_users::fillUser($request,$user);
        return response()->json([
            'success'=>true,
            'user_id'=>$user_id
        ]);
    }

    public function edit(CSU $request){
        $user = submitted_users::where('student_number',$request->student_number);
        $user_id = submitted_users::fillUser($request,$user);
        return response()->json([
            'success'=>true,
            'user_id'=>$user_id
        ]);
    }
    public function signupcheck(Request $request){
        $user = submitted_users::where('student_number',$request->student_number)->get();

        if(count($user)>=1){
            return response()->json(['submitted'=>true]);
        }
        else{
            return response()->json(['submitted'=>false]);
        }
    }

    
}

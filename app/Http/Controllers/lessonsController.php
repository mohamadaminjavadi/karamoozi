<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\submitted_users;
use App\Models\lessonsModel;
use App\Events\newMsg;

class lessonsController extends Controller
{
    public function newgrade (Request $request){
        $user_array = submitted_users::where('student_number',$request->student_number)->get();
        if(count($user_array)>=1){
            $user= $user_array[0];
        }
        else{
            return response()->json(['err'=>'چنین شماره دانشجویی در دیتابیس موجود نیست']);
        }

        
        $lesson_array = lessonsModel::where('lesson_number',$request->lesson_number)->get();
        if(count($lesson_array)>=1){
            $lesson = $lesson_array[0];
        }
        else{
            return response()->json(['err'=>'چنین شماره درسی در دیتابیس موجود نیست']);
        }
        
        $record = $user->lessons()->where('lesson_id',$lesson->id)->get();
        
        if($record->isEmpty()){
            $user->lessons()->attach($lesson,['grade'=>$request->grade]);
            // send msg to user
            $data = ['phone' => $user->phone,'grade' => $request->grade,'lesson'=> $lesson->name];
            event(new newMsg($data));
            
        }
        else{
            $user->lessons()->detach($lesson,['grade']);
            $user->lessons()->attach($lesson,['grade'=>$request->grade]);
            // send msg to user
            $data = ['phone' => $user->phone,'grade' => $request->grade,'lesson'=> $lesson->name];
            event(new newMsg($data));
            
        }
        
    }

    public function newlesson(Request $request){
        $lesson = new lessonsModel;
        $lesson_id = lessonsModel::filler($lesson,$request);
        return response()->json([
            'success'=>true,
            'lesson_id'=>$lesson_id
        ]);
    }

    public function deleteLesson(Request $request){
        lessonsModel::where('lesson_number',$request->lesson_number)->delete();
    }
}

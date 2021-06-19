<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class submitted_users extends Model
{
    use HasFactory;
    protected $table = 'submitted_users';

    public function lessons(){
        return $this->belongsToMany(lessonsModel::class, 'grades', 'student_id', 'lesson_id');
    }


    public static function fillUser($request, $user){
        $user->student_number = $request->student_number;
        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->telegram = $request->telegram;
        $user->save();
        return $user->id;
    }
}

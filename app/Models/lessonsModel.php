<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\submitted_users;

class lessonsModel extends Model
{
    use HasFactory;
    protected $table= 'lessons';
    public $timestamps = false;
    public function users(){
        return $this->belongsToMany(submitted_users::class, 'grades', 'lesson_id', 'student_id');
    }

    public static function filler($lesson,$request){
        
        $lesson->lesson_number = $request->lesson_number;
        $lesson->name = $request->name;
        $lesson->save();
        return $lesson->id;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\submitted_users;

class lessonsModel extends Model
{
    use HasFactory;
    protected $table= 'lessons';
    public function users(){
        return $this->belongsToMany(submitted_users::class, 'grades', 'lesson_id', 'student_id');
    }
}

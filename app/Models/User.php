<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public static function fillUser($request, $user){
        $user->name = $request->name;
        $user->email = $request->email;
        $user->student_id = $request->student_id;
        $user->password = Hash::make($request->password);
        $user->save();
        return $user->id;
    }
    public static function editUser($request, $user){
        $user->name = $request->name;
        $user->email = $request->email;
        $user->student_id = $request->student_id;
        $user->save();
        return $user->id;
    }
}

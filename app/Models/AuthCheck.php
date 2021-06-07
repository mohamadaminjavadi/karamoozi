<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class AuthCheck extends Model
{
    use HasFactory;

    public static function Authenticate($credentials){
        $user = User::where('email', $credentials['email'])->get();
        if($user[0]->exists()){
            if($user[0]['password']==$credentials['password']){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}

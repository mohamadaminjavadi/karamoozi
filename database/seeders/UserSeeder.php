<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $code=9653200006;
        DB::table('users')->insert([
            'student_number'=>'9653200006',
            'password' =>Hash::make($code),
            'name' =>'amin',
            'last_name' =>'javadi',
        ]);
    }
}

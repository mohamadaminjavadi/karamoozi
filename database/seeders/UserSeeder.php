<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'student_number'=>'9653200006',
            'password' =>'9653200006',
            'name' =>'amin',
            'last_name' =>'javadi',
        ]);
    }
}

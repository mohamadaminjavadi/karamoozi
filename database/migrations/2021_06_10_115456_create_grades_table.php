<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGradesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('grades')){
            Schema::create('grades', function (Blueprint $table) {
                $table->id();

                $table->unsignedBigInteger('student_id')->index();
                $table->foreign('student_id')->references('id')->on('submitted_users');

                $table->unsignedBigInteger('lesson_id')->index();
                $table->foreign('lesson_id')->references('id')->on('lessons');

                $table->integer('grade');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('grades');
    }
}

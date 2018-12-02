<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropUserDescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::dropIfExists('user_descriptions');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::create('user_descriptions', function (Blueprint $table) {
        $table->increments('id');
        $table->timestamps();
        $table->integer('user_id');
        $table->text('description_body');
    });
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'questions';
    protected $fillable = ['title', 'user_id'];

    public function user()
    {
      return $this->belongsTo('App\User');
    }

    public function answers()
    {
        return $this->hasMany('App\Answer')->orderBy('created_at', 'desc');
    }
}

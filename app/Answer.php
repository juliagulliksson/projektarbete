<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
  /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'answers';
    protected $fillable = ['title', 'user_id'];

    public function user()
    {
      return $this->belongsTo('App\User');
    }

    public function question()
    {
        return $this->belongsTo('App\Question');
    }
}

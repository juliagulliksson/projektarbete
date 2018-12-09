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

    /**
     * Return the answers belonging to the question, and order them by most recently created 
     * and the highest amount of upvotes
     */
    public function answers()
    {
        return $this->hasMany('App\Answer')->withCount('votes')->orderBy('votes_count', 'desc')
        ->orderBy('created_at', 'desc');
    }
}

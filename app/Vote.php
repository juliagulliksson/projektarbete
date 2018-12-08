<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vote extends Model
{
  use SoftDeletes;

  protected $table = 'voteables';

  protected $fillable = [
      'user_id',
      'voteable_id',
      'voteable_type',
  ];

  public function voteable()
  {
      return $this->morphTo();
  }

  public function user(){
    return $this->belongsTo('App\User');
  }
}

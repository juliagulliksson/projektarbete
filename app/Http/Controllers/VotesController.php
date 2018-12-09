<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vote;

class VotesController extends Controller
{

    public function upvoteAnswer(Request $request){
     
      $vote = new Vote;
      $vote->user_id = auth()->user()->id;
      $vote->voteables_id = $request->id;
      $vote->voteables_type = $request->type;
      $vote->save();
      return response()->json(['status' => 200, 'vote' => $vote]);

    }
}

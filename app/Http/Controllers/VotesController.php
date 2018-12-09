<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vote;

class VotesController extends Controller
{

    public function upvoteAnswer(Request $request){

      /**
       * Check if the user has already upvoted this answer
       */
      $existing_vote = Vote::where('voteables_id', $request->id)
      ->where('user_id', auth()->user()->id)->where('voteables_type', $request->type)->first();

      if (is_null($existing_vote)) {
        
        $vote = new Vote;
        $vote->user_id = auth()->user()->id;
        $vote->voteables_id = $request->id;
        $vote->voteables_type = $request->type;
        $vote->deleted_at = null;
        $vote->save();
        return response()->json(['status' => 200, 'vote' => $vote]);
      }  else {

        if (is_null($existing_vote->deleted_at)) {
          //If the vote hasn't been deleted in the past, delete it if the user clicks on 'vote'
          $existing_vote->delete();
          return response()->json(['status' => 200, 'vote' => $existing_vote]);
          
        } else {
          // Restore the vote if the user clicks on "Upvote" once again
          $existing_vote->restore();
          return response()->json(['status' => 200, 'vote' => $existing_vote]);

        }
      }

    }
}

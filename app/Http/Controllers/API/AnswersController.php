<?php

namespace App\Http\Controllers\API;

use App\Answer;
use App\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnswersController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      //Not used
      return Answer::with('votes', 'votes.user')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
     
   
      $question = Question::find($request->question_id);
      if ($question) {
         /**
         * Update the question if it has not been answered before
         */
        if ($question->answered_at === null) {
          $timestamp = date('Y-m-d G:i:s');
          $question->answered_at = $timestamp;
          $question->save();
        }
        
        /** 
         * Create new answer
         */
  
        $answer = new Answer;
        $answer->body = $request->body;
        $answer->user_id = auth()->user()->id;
        $answer->question_id = $request->question_id;
        $answer->save();
        return response()->json(['answer' => $answer, 'status' => 201]);
      } else {
        return response()->json(['status' => 500]);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $answer = Answer::find($id);
      if ($answer) {
        $answer->body = $request->body;
        $answer->save();
        return response()->json(['status' => 200, 'answer' => $answer]);
      } else {
        return response()->json(['status' => 500]);
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $answer = Answer::find($id);
      if ($answer) {
        $answer->delete();
        return response()->json(['status' => 200]);
      } else {
        return response()->json(['status' => 500]);
      }
    }

    public function userAnswers($user_id){
      return Answer::where('user_id', $user_id)->with('question', 'question.user')->orderBy('created_at', 'desc')->get();
    }
}

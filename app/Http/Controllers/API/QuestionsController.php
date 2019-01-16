<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($answered)
    {
        if ($answered === 'true') {

          return Question::whereNotNull('answered_at')->with('user', 'answers', 'answers.user', 'answers.votes','answers.votes.user')
          ->orderBy('answered_at', 'desc')
          ->orderBy('created_at', 'desc')->simplePaginate(6);
        } else {

          return Question::whereNull('answered_at')->with('user', 'answers', 'answers.user', 'answers.votes','answers.votes.user')
            ->orderBy('answered_at', 'desc')
            ->orderBy('created_at', 'desc')->simplePaginate(6);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $question = new Question;
        $question->title = $request->title;
        $question->user_id = auth()->user()->id;
        $question->answered_at = null;
        $question->save(); 
        return response()->json(['question' => $question,'status' =>  201]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $question = Question::with('user', 'answers', 'answers.user',  'answers.votes')->where('id', $id)->first();
      if($question) {
        return response()->json(['status' => 200, 'question' => $question]);
      } else {
        return response()->json(['status' => 500]);
      }
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
      $question = Question::find($id);
      if ($question) {
        $question->title = $request->title;
        $question->save();
        return response()->json(['status' => 200, 'question' => $question]);
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
      $question = Question::find($id);
      if ($question) {
        $question->delete();
        return response()->json(['status' => 200]);
      } else {
        return response()->json(['status' => 500]);
      }
    }

    public function userQuestions($user_id){
      return Question::where('user_id', $user_id)->orderBy('created_at', 'desc')->simplePaginate(6);
    }
}

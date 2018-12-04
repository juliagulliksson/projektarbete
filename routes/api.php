<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * All routes passing through middleware is going to require an authorization token in header
 */
Route::middleware('auth:api')->group(function () {
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  
  Route::apiResource('/questions', 'API\QuestionsController')->except([
    'index', 'userQuestions', 'show'
  ]);

  Route::apiResource('/answers', 'API\AnswersController')->except([
    'index', 'userAnswers', 'show'
  ]);
  
  Route::post('/logout', 'AuthController@logout');
  Route::post('/userdescription', 'UsersController@addDescription');
}); 


Route::get('answers/user/{userId}', 'API\AnswersController@userAnswers');

Route::post('setcookie', 'CookieController@setcookie');
Route::get('returncookie', 'CookieController@returncookie');

Route::get('questions/{question}', 'API\QuestionsController@show');

Route::get('questions/user/{user_id}', 'API\QuestionsController@userQuestions');

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');

Route::get('/questions', 'API\QuestionsController@index');

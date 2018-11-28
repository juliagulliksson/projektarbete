<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AuthController extends Controller
{
  public function login(Request $request)
  {
  
      // // Send an internal API request to get an access token
      // $client = DB::table('oauth_clients')
      //     ->where('password_client', true)
      //     ->first();
  
      // // Make sure a Password Client exists in the DB
      // if (!$client) {
      //     return response()->json([
      //         'message' => 'Laravel Passport is not setup properly.',
      //         'status' => 500
      //     ], 500);
      // }
  
      // $data = [
      //     'grant_type' => 'password',
      //     'client_id' => $client->id,
      //     'client_secret' => $client->secret,
      //     'username' => request('username'),
      //     'password' => request('password'),
      // ];
  
      // $request = Request::create('/oauth/token', 'POST', $data);
  
      // $response = app()->handle($request);
  
      // // Check if the request was successful
      // if ($response->getStatusCode() != 200) {
      //   return $response;
      //     return response()->json([
      //         'message' => 'Wrong email or password',
      //         'status' => 422
      //     ], 422);
      // }
  
      // // Get the data from the response
      // $data = json_decode($response->getContent());
  
      // // Format the final response
      // return response()->json([
      //     'token' => $data->access_token,
      //     'user' => $user,
      //     'status' => 200
      // ]);
       
      try { 

        /**
       * Make a request to the database/API and return the token if login is correct
       */

        $client = DB::table('oauth_clients')
        ->where('password_client', true)
        ->first();
  
        $data = [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => request('username'),
            'password' => request('password'),
        ];
  
        $request = Request::create('/oauth/token', 'POST', $data);
        return app()->handle($request);
      
      } catch (\GuzzleHttp\Exception\BadResponseException $e) {
          if ($e->getCode() === 400) {
              return response()->json('Invalid Request. Please enter a username or a password.', $e->getCode());
          } else if ($e->getCode() === 401) {
              return response()->json('Your credentials are incorrect. Please try again', $e->getCode());
          }
          return response()->json('Something went wrong on the server.', $e->getCode());
      } 
     
  }

  public function register(Request $request){
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => 'required|string|min:6',
    ]);

    User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => bcrypt($request->password),
    ]);

    return response()->json(['status' => 201]);
  }

  public function logout(){
    /**
     * Revoke the token that matches the user in the DB
     */
    $accessToken = auth()->user()->token();

    $refreshToken = DB::table('oauth_refresh_tokens')
      ->where('access_token_id', $accessToken->id)
      ->update([
        'revoked' => true
    ]);

    $accessToken->revoke();

    return response()->json(['status' => 200]);
  }
}

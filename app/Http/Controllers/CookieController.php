<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CookieController extends Controller
{
    public function setcookie(Request $request){
      $cookie = setcookie('token', $request->token, time()+3600, '/', 'www.projektarbete.com', false , true);
      if ($cookie) {
        return response()->json([
          'status' => 200
        ]);
      } else {
        return response()->json([
          'status' => 500
        ]);
      }
      
    }

    public function returncookie(){
      // $cookie = $_COOKIE['token'];
      if(isset($_COOKIE['token'])){
        return response()->json([
          'status' => 200,
          'token' => $_COOKIE['token']
        ]);
      } else {
        return response()->json([
          'status' => 401
        ]);
      }
      
    }

    public function validateCookie(Request $request){
      if(isset($_SESSION['token'])){
        if($request->token === $_SESSION['token']){
          return response()->json([
            'status' => 200
          ]);
        } else {
          return response()->json([
            'status' => 401
          ]);
        }
      } else {
        return response()->json([
          'status' => 401
        ]);
      }
    }
}

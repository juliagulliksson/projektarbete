<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{
    public function addDescription(Request $request){
      $user_id = auth()->user()->id;
      $user = User::findOrFail($user_id);
      $user->description = $request->description;
      $user->save();
      return response()->json(['user' => $user, 'status' => 201]);
    }
}

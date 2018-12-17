<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{
    public function addDescription(Request $request){
      $request->validate([
        'description' => 'required|string|max:255',
      ]);
      $user_id = auth()->user()->id;
      $user = User::findOrFail($user_id);
      $user->description = $request->description;
      $user->save();
      return response()->json(['user' => $user, 'status' => 200]);
    }

    public function changeUsername(Request $request, $id){
      $user = User::find($id);
      $user->name = $request->name;
      $user->save();
      return response()->json(['user' => $user, 'status' => 200]);
    }
}

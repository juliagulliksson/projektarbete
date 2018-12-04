<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{catchall?}', function () {
    return view('vueapp');
})->where('catchall', '^(?!api).*$');

Route::get('/{vue_capture?}', function () {
  return view('vueapp');
})->where('vue_capture', '^(?!storage).*$'); 
// Route::get('/{catchall?}', 'AppController@show')->where('catchall', '^(?!api).*$')->name('administration');
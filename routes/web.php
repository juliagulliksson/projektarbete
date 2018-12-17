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

/**
 * To make history mode work, the urls must be replaced and also not include the api keyword
 */
Route::get('{catchall?}', function () {
    return view('index');
})->where('catchall', '^(?!api).*$');

Route::get('/{vue_capture?}', function () {
  return view('index');
})->where('vue_capture', '^(?!storage).*$'); 
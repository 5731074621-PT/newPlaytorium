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

//timesheet route
Route::get('/', function () {
    return redirect()->route('timesheet');
});

Route::get('/timesheet', 'TimesheetController@index')->name('timesheet');

Route::post('/timesheet/addTask', 'TimesheetController@addTask');

//leave request route
Route::get('/leave_request', function () {
    return view('leave_request');
});

Route::get('/project', function () {
    return view('project');
});
Route::post('/submit' , 'MessagesController@submit');

Route::get('/export' , 'MessagesController@export');

Route::get('/report', function () {
    return view('report');
});
Route::get('/project_detail', function () {
    return view('project_detail');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

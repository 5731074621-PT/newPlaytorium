<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;

class LeaverequestController extends Controller
{

  public function __construct()
  {
      $this->middleware('auth');
  }


  public function leave_request(Request $request)
  {
      return view('leave_request');
  }

  public function index(Request $request)
  {
      $leave_request_historys = DB::select('SELECT * FROM leaverequest_of_employee WHERE id = ? ', [Auth::id()]);
      return view('leave_request_history')->with('leave_request_history' ,$leave_request_historys);
  }

  public function addLeave(Request $request)
  {
      DB::insert('insert into leaverequest_of_employee values (?, ?,?,?,?,?)', [(Auth::id()),$request->input('from'),$request->input('to'),$request->input('leave_type'),'0',$request->input('purpose')]);
      // $leave_request_history = new leaverequest_of_employee;
      // $leave_request_history->id = Auth::id();
      // $leave_request_history->from = $request->input('from');
      // $leave_request_history->to = $request->input('to');
      // $leave_request_history->purpose = $request->input('purpose');
      // $leave_request_history->leave_type = $request->input('leave_type');
      // $leave_request_history->status = $request->input('0');
      // $leave_request_history->save();
      return redirect()->route('leave_request');
  }


}

<?php

namespace App\Http\Controllers;
use App\Model\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class UserController extends Controller {

	public function createUser(Request $request)  {

		$rules = [
	    'first_name' => 'required',
	    'last_name' => 'required',
		 ];

		$customMessages = [
			'required' => ':attribute cannot be empty.'
		];

		$this->validate($request, $rules, $customMessages);

		$token = $request->header('Authorization');

		$current_users = DB::select('SELECT login FROM users WHERE token = ?', [$token]);

		foreach ($current_users as $current_user) {
			$current_user = $current_user->login;
		}

		if (empty($current_user)) {
			$res = array (
				"code" => 401,
				"message" => "Unauthorized");

			return response($res, 401);
		}

		try {
	    $hasher = app()->make('hash');
			$current_time = Carbon::now()->toDateTimeString();
			$role = $request->input('role');
	    $firstname = $request->input('first_name');
	    $lastname = $request->input('last_name');
			$gender = $request->input('gender');
			$birthdate = $request->input('birth_date');
			$hiredate = $request->input('hire_date');
			$email = $request->input('email');
			$login = $request->input('login');
	    $password = $request->input('password');
			$token = $hasher->make($current_time);
			$createdby = $current_user;
			$status = "OFF";

	    $save = User::create([
				'role'=> $role,
        'first_name'=> $firstname,
				'last_name'=> $lastname,
				'gender'=> $gender,
				'birth_date'=> $birthdate,
				'hire_date'=> $hiredate,
        'email'=> $email,
				'login'=> $login,
        'password'=> $password,
				'token'=> $token,
				'status'=>$status,
				'created_by' => $createdby,
	    ]);
	    $res['status'] = true;
	    $res['message'] = 'Created';
			$res['data'] = $save;

	    return response($res, 201);
		}
		catch (\Illuminate\Database\QueryException $ex) {
		  $res['status'] = false;
		  $res['message'] = $ex->getMessage();

		  return response($res, 500);
		}
  }

}

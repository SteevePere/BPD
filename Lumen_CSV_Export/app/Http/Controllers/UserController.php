<?php

namespace App\Http\Controllers;
use App\Model\User;
use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller {

	public function export2CSV(Request $request) {

		$token = $request->header('Authorization');

		$roles = DB::select('SELECT role FROM users WHERE token = ?', [$token]);

		foreach ($roles as $role) {
			$role = $role->role;
		}

		if (empty($role)) {
			$res = array (
				"code" => 401,
				"message" => "Unauthorized");

			return response($res, 401);
		}

		if ($role == 'chief') {

			$table = User::all();
			$filename = "Users.csv";
			$handle = fopen($filename, 'w');
			$headers = array(
				'Content-Type' => 'text/csv',
			);

			fputcsv($handle, array('Id', 'Position', 'First Name', 'Last Name', 'Gender', 'Birth Date', 'Hire Date', 'E-mail', 'Login', 'Account Status'));

			foreach ($table as $row) {
				fputcsv($handle, array($row['id'], $row['role'], $row['first_name'], $row['last_name'], $row['gender'], $row['birth_date'], $row['hire_date'], $row['email'], $row['login'], $row['status']));
			}

			fclose($handle);

			return response()->download($filename, 'Users.csv', $headers)->deleteFileAfterSend(true);
		}

		else {
			$res = array (
				"code" => 403,
				"message" => "Forbidden");

			return response($res, 403);
		}
	}

}

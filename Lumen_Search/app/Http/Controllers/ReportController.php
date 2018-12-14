<?php

namespace App\Http\Controllers;
use App\Model\Report;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class ReportController extends Controller {

	public function search(Request $request) {

		$rules = [
	    'field' => 'required',
	    'keyword' => 'required',
			'per_page' => 'integer',
			'page' => 'integer',
		 ];

		$customMessages = [
			'required' => ':attribute cannot be empty.',
			'integer' => ':attribute must be an integer.',
		];

		$this->validate($request, $rules, $customMessages);

		$token = $request->header('Authorization');
		$roles = DB::connection('mysql')->select('SELECT role FROM users WHERE token = ?', [$token]);

		foreach ($roles as $role) {
			$role = $role->role;
		}

		if (empty($role)) {
			$res = array (
				"code" => 401,
				"message" => "Unauthorized");

			return response($res, 401);
		}

		$total_count = Report::count();
		$page = (int)$request->input('page');
		$per_page = (int)$request->input('per_page');

		if ($per_page == 0) {
			$per_page = 25;
		}

		$per_page = min(max(1, $per_page), 500);
		$total_pages = ceil($total_count / $per_page);
		$page = min(max(1, $page), $total_pages);

		$field = $request->input('field');
		$keyword = $request->input('keyword');

		$keyword = '%'.$keyword.'%';

		$reports = Report::where($field, 'like', $keyword)->skip($per_page * ($page - 1))->take($per_page)->get();

		$response = [
			'total_reports' => $total_count,
			'matching_reports' => $reports,
			];

		return response($response, 200);
	}

}

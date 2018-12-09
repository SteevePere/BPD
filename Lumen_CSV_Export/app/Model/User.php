<?php
namespace App\Model;
use Illuminate\Database\Eloquent\Model;

class User extends Model {
	public $timestamps = false;
	protected $fillable = ['id', 'role', 'first_name', 'last_name', 'gender', 'birth_date', 'hire_date', 'email', 'login', 'password', 'status', 'token'];
	protected $table = 'users';
}

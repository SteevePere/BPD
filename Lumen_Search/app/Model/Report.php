<?php
namespace App\Model;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Report extends Eloquent {

	protected $connection = 'mongodb';
	protected $collection = 'crime_incident_reports';
	protected $fillable = ['compnos', 'naturecode', 'incident_type_description', 'main_crimecode', 'reptdistrict', 'reportingarea', 'fromdate', 'weapontype', 'shooting', 'domestic', 'shift', 'year', 'month', 'day_week', 'ucrpart', 'x', 'y', 'streetname', 'xstreetname', 'location'];

}

<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class UnitTest extends TestCase {

  use DatabaseMigrations;

  public function testCsvExport() {

    $response = $this->call('GET', '/exportToCsv');

    $this->assertEquals(401, $response->status());
  }

}

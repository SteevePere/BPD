<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class UnitTest extends TestCase {

  use DatabaseMigrations;

  public function testGetAll() {

    $response = $this->call('GET', '/users');

    $this->assertEquals(200, $response->status());
  }

  public function testCreateOne() {

    $this->post('user', ['first_name' => 'test','last_name' => 'test','gender' => 'M','login' => 'ttest1','password' => 'ttest1_123','role' => 'agent']);
    $this->seeStatusCode(401);

    $this->seeInDatabase('users', ['login' => 'hbauer']);
  }

}

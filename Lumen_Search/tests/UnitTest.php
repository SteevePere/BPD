<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class UnitTest extends TestCase {

  use DatabaseMigrations;

  public function testGetSearchResults() {

    $this->get('searchResults', ['field' => 'weapontype','keyword' => 'firearm', 'per_page' => '10', 'page' => '1']);
    $this->seeStatusCode(200);

  }

}

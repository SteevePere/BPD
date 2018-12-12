<template>
  <div>
    <Navbar/>
    <div id="wrapper">
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <b-button
            to="/profil"
            class="profil">
            <img
              style="max-height: 25px;max-width: 25px;padding-right: 10px;"
              src="~/assets/user-solid.svg">{{ $store.state.authUser.data.first_name }}</b-button>
          <b-dropdown
            class="profil"
            left
            split
            text="Crimes">
            <b-dropdown-item
              v-if="role === 'chief' || role === 'detective'"
              to="/crimes">Add Crimes</b-dropdown-item>
            <b-dropdown-item
              to="/allReport">See Crimes</b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item
              v-if="role === 'chief'
              ">Update</b-dropdown-item>
          </b-dropdown>
        </ul>
      </div>
      <div id="page-content-wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              Hello {{ $store.state.authUser.data.first_name }}!
              <p><i>Role :</i></p>
              <p>{{ role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar';

export default {
  components: {
    Navbar
  },
  data () {
    return {
      role: this.$store.state.authUser.data.role,
    }
  },
middleware : 'auth',

}
</script>

<style>
.profil {
  margin-top:20px;
  padding-right: 20%;
}
  #wrapper {
      padding-left: 0;
      -webkit-transition: all 0.5s ease;
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      transition: all 0.5s ease;
  }

  #wrapper.toggled {
      padding-left: 250px;
  }

  #sidebar-wrapper {
      z-index: 1000;
      position: fixed;
      left: 0;
      width: 0;
      height: 100%;
      margin-right: -250px;
      overflow-y: auto;
      background: #a2a2a2;
      -webkit-transition: all 0.5s ease;
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      transition: all 0.5s ease;
  }

  #wrapper.toggled #sidebar-wrapper {
      width: 200px;
  }

  #page-content-wrapper {
      width: 100%;
      position: absolute;
      padding: 15px;
  }

  #wrapper.toggled #page-content-wrapper {
      position: absolute;
      margin-right: -250px;
  }

  /* Sidebar Styles */

  .sidebar-nav {
      position: absolute;
      top: 0;
      width: 200px;
      margin-left: 7%;
      padding: 0;
      list-style: none;
  }

  .sidebar-nav li {
      text-indent: 20px;
      line-height: 40px;
  }

  .sidebar-nav li a {
      display: block;
      text-decoration: none;
      color: #000000;
  }

  .sidebar-nav li a:hover {
      text-decoration: none;
      color: #fff;
      background: rgba(255,255,255,0.2);
  }

  .sidebar-nav li a:active,
  .sidebar-nav li a:focus {
      text-decoration: none;
  }

  .sidebar-nav > .sidebar-brand {
      height: 65px;
      font-size: 18px;
      line-height: 60px;
  }

  .sidebar-nav > .sidebar-brand a {
      color: #000000;
  }

  .sidebar-nav > .sidebar-brand a:hover {
      color: #fff;
      background: none;
  }

  @media(min-width:768px) {
      #wrapper {
          padding-left: 250px;
      }

      #wrapper.toggled {
          padding-right: 0;
      }

      #sidebar-wrapper {
          width: 250px;
      }

      #wrapper.toggled #sidebar-wrapper {
          width: 0;
      }

      #page-content-wrapper {
          padding: 20px;
          position: relative;
      }

      #wrapper.toggled #page-content-wrapper {
          position: relative;
          margin-right: 0;
      }
  }



</style>

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
              src="~/assets/user-solid.svg">{{ $store.state.authUser.data.first_name }} {{ $store.state.authUser.data.last_name }}</b-button>
          <b-dropdown
            class="menu"
            left
            text="Report Management">
            <b-dropdown-item
              v-if="role === 'chief' || role === 'detective'"
              class="menu-item"
              to="/crimes">Add a report
            </b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item
              v-if="role === 'chief'
              ">Update a report
            </b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item
              to="/allReport">Browse reports
            </b-dropdown-item>
          </b-dropdown>
        </ul>
      </div>
      <Map/>
      <MonthChart
        style="float: left; width: 50%; padding: 20px;"
      />
      <MonthChart
        style="float: right; width: 50%; padding: 20px; background: rgb(33, 37, 41);"
      />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar';
import Map from '~/components/Map';
import MonthChart from '~/components/MonthChart';

export default {
  components: {
    Navbar,
    Map,
    MonthChart
  },
  async fetch ({store}) {
    await store.dispatch('perMonth',{
      token: store.state.authUser.data.token,
      year: 2015,
    });
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
@import url('https://js.arcgis.com/4.2/esri/css/main.css');
.profil {
  margin-top:0px;
  border-radius: 0;
  padding-right: 10%;
  padding-top: 12px;
  display: block;
  background: #2A3F54;
  border-color: #2A3F54;
  height: 50px;
}

.menu {
  margin-top:40px;
  padding-right:12px;
  display: block;
  width: 100%;
  text-align: center;
}

.dropdown-menu.show {
  margin-left: 12px;
}

.menu-item {
  padding-right:25px;
  display: block;
  width: 100%;
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
      background: rgb(33, 37, 41);
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
      width: 250px;
      /* margin-left: 20px; */
      text-align: center;
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


  #viewDiv {
    height: 650px;
    width: 100%;
  }
  .title
  {
    margin-top: 50px;
  }
  .info
  {
    font-weight: 300;
    color: #9aabb1;
    margin: 0;
    margin-top: 10px;
  }
  .button
  {
    margin-top: 50px;
  }

  .esri-ui-manual-container>.esri-component {
    background: #2A3F54;
    color: grey;
  }

  .esri-attribution__powered-by {
    margin-right: 20px;
  }

  .esri-widget button, .esri-widget [role="button"] {
    font-size: 11px;
  }

  .esri-ui-corner .esri-widget {
    padding: 3px;
  }

  .esri-ui-top-right .esri-component, .esri-ui-top-left .esri-component {
    border-radius: 3px;
  }


</style>

<template>
  <div>
    <Navbar/>
    <div id="wrapper">
      <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
          <b-button
            to="/profil"
            title="My Profile"
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
              to="/crimes">File New
            </b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item
              v-if="role === 'chief' || role === 'detective'"
              to="/allReport">Browse and Manage
            </b-dropdown-item>
            <b-dropdown-item
              v-if="role === 'agent'"
              to="/allReport">Browse and Search
            </b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item
              v-if="role === 'chief' || role === 'detective'"
              class="menu-item"
              to="/analytics">Analytics
            </b-dropdown-item>
          </b-dropdown>
        </ul>
      </div>
    </div>
    <div
      class="col-md-9"
      style="margin-top: 140px">
      <div
        class="card"
        style="margin-bottom: 50px; background: #2A3F54;">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <div
                class="profile-header-container"
                style="float:left;">
                <div class="profile-header-img">
                  <img
                    v-if="role === 'chief'"
                    class="img-circle img"
                    style="height: 150px; width: 120px;"
                    src="../assets/ProfileChief.jpeg">
                  <img
                    v-if="role != 'chief' && gender === 'M'"
                    class="img-circle img"
                    style="height: 150px; width: 150px;"
                    src="../assets/policeman.png">
                  <img
                    v-if="role != 'chief' && gender === 'F'"
                    class="img-circle img"
                    style="height: 150px; width: 150px;"
                    src="../assets/policewoman.png">
                </div>
              </div>
              <div style="float:left; margin-top: 50px; margin-left: 25px;">
                <h4>My Profile</h4>
              </div>
            </div>
          </div>
          <br>
          <br>
          <div class="row">
            <div class="col-md-12">
              <form>
                <div class="form-group row">
                  <label
                    for="firstName"
                    class="col-4 col-form-label">First Name</label>
                  <div class="col-8">
                    <p
                      class="form-control here"
                      disabled >{{ firstName }}</p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="lastName"
                    class="col-4 col-form-label">Last Name</label>
                  <div class="col-8">
                    <p
                      class="form-control here"
                      disabled >{{ lastName }}</p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="role"
                    class="col-4 col-form-label">Role</label>
                  <div class="col-8">
                    <p
                      class="form-control here"
                      disabled >{{ role }}</p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="email"
                    class="col-4 col-form-label">Email</label>
                  <div class="col-8">
                    <p
                      class="form-control here"
                      disabled >{{ email }}</p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="gender"
                    class="col-4 col-form-label">Gender</label>
                  <div class="col-8">
                    <p
                      class="form-control here"
                      disabled >{{ gender }}</p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="login"
                    class="col-4 col-form-label">Login</label>
                  <div class="col-8">
                    <p
                      class="form-control here"
                      disabled >{{ login }}</p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="birth_date"
                    class="col-4 col-form-label">Birth Date</label>
                  <div class="col-8">
                    <p
                      class="form-control here"
                      disabled >{{ birth_date }}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Navbar from '~/components/Navbar'
	export default {
    components: {
      Navbar
    },
		data () {
	    return {
        firstName: this.$store.state.authUser.data.first_name,
        lastName: this.$store.state.authUser.data.last_name,
        gender: this.$store.state.authUser.data.gender,
        birth_date: this.$store.state.authUser.data.birth_date,
        hire_date: this.$store.state.authUser.data.hire_date,
        email: this.$store.state.authUser.data.email,
        login: this.$store.state.authUser.data.login,
	      role: this.$store.state.authUser.data.role
	    }
	  },
		middleware : 'auth',
		methods: {

		}
	}
</script>

<style>

.img {
  border-radius: 50%;
  text-align: center;
}

.col-md-9 {
  max-width:70%;
  margin-left: 22%;
  margin-top: 50px;
}

.col-form-label {
  color: white;
}

h4, .h4 {
  color: white;
}

.row {
  margin-right: 15px;
}
</style>

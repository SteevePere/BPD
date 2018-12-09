<template>
  <div>
    <Navbar/>
    <div class="col-md-9">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <h4>Your Profile</h4>
              <div class="profile-header-container">
                <div class="profile-header-img">
                  <img
                    class="img-circle img"
                    src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120">
                </div>
              </div>
              <hr>
            </div>
          </div>
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
                <div class="form-group row">
                  <label
                    for="newpass"
                    class="col-4 col-form-label disabled">Old Password</label>
                  <div class="col-8">
                    <input
                      id="newpass"
                      v-model="oldpwd"
                      name="newpass"
                      placeholder="Old Password"
                      class="form-control here"
                      type="text">
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    for="newpass"
                    class="col-4 col-form-label disabled">New Password</label>
                  <div class="col-8">
                    <input
                      id="newpass"
                      v-model="newpwd"
                      name="newpass"
                      placeholder="New Password"
                      class="form-control here"
                      type="text">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-4 col-8">
                    <button
                      name="submit"
                      type="submit"
                      class="btn btn-primary">Update My Password</button>
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
</style>

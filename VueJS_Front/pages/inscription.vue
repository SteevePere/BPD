<template>
  <div>
    <Navbar :key="navbar"/>
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
              to="/crimes">Add New
            </b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item
              to="/allReport">Browse and Manage
            </b-dropdown-item>
          </b-dropdown>
        </ul>
      </div>
    </div>
    <div
      class="col-md-9"
      style="margin-left: 360px; margin-top: 140px; max-width: 70%;">
      <div
        class="card"
        style="margin-bottom: 50px; background: rgb(42, 63, 84);">
        <div
          class="card-body"
          style="margin-left: 30px; margin-right: 30px;">
          <div class="row">
            <div class="col-md-12">
              <div style="margin-top: 50px; text-align: center; ">
                <h4
                  style="color: white;"
                >New user</h4>
                <br>
              </div>
            </div>
          </div>
          <br>
          <br>
          <div class="row">
            <div class="col-md-12">
              <form
                class="well form-horizontal"
                @submit.prevent="inscription">
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">First Name</label>
                  <div class="col-8">
                    <p><input
                      id="fullName"
                      v-model="formFirstName"
                      name="fullName"
                      class="form-control"
                      required="true"
                      value=""
                      type="text"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Last Name</label>
                  <div class="col-8">
                    <p><input
                      id="Last_Name"
                      v-model="formLastName"
                      name="last_nameName"
                      class="form-control"
                      required="true"
                      value=""
                      type="text"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Role</label>
                  <div class="col-8">
                    <p><select
                      v-model="formRole"
                      class="selectpicker form-control">
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id">{{ option.label }}</option>
                      <option
                        v-if="role === 'chief'"
                        value="chief">Chief</option>
                    </select></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Gender</label>
                  <div class="col-8">
                    <p><select
                      v-model="formGenre"
                      class="selectpicker form-control">
                      <option
                        v-for="option in GenreOption"
                        :key="option.id"
                        :value="option.id">{{ option.label }}</option>
                    </select></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Birth Date</label>
                  <div class="col-8">
                    <p><input
                      id="birth_date"
                      v-model="formdate"
                      name="birth_date"
                      class="form-control"
                      required="true"
                      value=""
                      type="date"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Hire Date</label>
                  <div class="col-8">
                    <p><input
                      id="hire_date"
                      v-model="formHire"
                      name="hire_date"
                      class="form-control"
                      required="true"
                      value=""
                      type="date"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Login</label>
                  <div class="col-8">
                    <p><input
                      id="login"
                      v-model="formLogin"
                      name="login"
                      class="form-control"
                      required="true"
                      value=""
                      type="text"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Email</label>
                  <div class="col-8">
                    <p><input
                      id="email"
                      v-model="formEmail"
                      name="email"
                      class="form-control"
                      required="true"
                      value=""
                      type="email"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Password</label>
                  <div class="col-8">
                    <p
                      style="margin-bottom: 0;"
                    ><input
                      id="pass"
                      v-model="formPassword"
                      name="password"
                      class="form-control"
                      required="true"
                      pattern=".{6,}"
                      value=""
                      type="password">
                      <small
                        style="color: white;"
                      >At least 6 characters</small>
                    </p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Confirm Password</label>
                  <div class="col-8">
                    <p><input
                      id="passConf"
                      v-model="formPasswordConf"
                      name="passwordConf"
                      class="form-control"
                      required="true"
                      pattern=".{6,}"
                      value=""
                      type="password"></p>
                  </div>
                </div>
                <br>
                <button
                  v-show="show"
                  class="btn btn-primary"
                  type="submit"
                  value="Submit"
                  name="button"
                >Save User</button>
                <b-button
                  v-show="show"
                  to="/home"
                  class="btn btn-danger"
                >Cancel</b-button>
                <p
                  v-if="formError"
                  class="error">{{ formError }}</p>
                <center>
                  <p v-if="errors.length">
                    <br>
                    <ul>
                      <p
                        v-for="error in errors"
                        :key="error.formError"
                        style="color: white;"
                      >{{ error }}</p>
                    </ul>
                  </p>
                </center>
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
    data() {
      return {
        role: this.$store.state.authUser.data.role,
        token: this.$store.state.authUser.data.token,
        notifs: this.$store.state.authUser.notifs.total_notifs,
        errors: [],
        formFirstName: '',
        formLastName: '',
        formPassword: '',
        formPasswordConf: '',
        formEmail: '',
        formLogin: '',
        formdate: '',
        formGenre: '',
        formRole: '',
        formHire: '',
        formError:null,
        formResult: null,
        navbar: 0,
        show: true,
        GenreOption: [{id: 'M', label: 'Male'}, {id: 'F', label: 'Female'} ],
        options: [ {id: 'agent', label: 'Agent'}, {id: 'detective', label: 'Detective'} ]
      }
    },
  middleware : 'auth',
  methods : {
    async inscription() {

      this.errors = [];
      if (!this.formFirstName) {
        this.errors.push('First Name required');
      }
      if (!this.formLastName) {
        this.errors.push('Last Name required');
      }
      if (!this.formEmail) {
        this.errors.push('Email required');
      }
      if (!this.formLogin) {
        this.errors.push('Login required');
      }
      if (!this.formdate) {
        this.errors.push('Date required');
      }
      if (!this.formGenre) {
        this.errors.push('Genre required');
      }
      if (!this.formRole) {
        this.errors.push('Role required');
      }
      if (!this.formHire) {
        this.errors.push('Hire required');
      }
      if (this.formPassword !== this.formPasswordConf) {
        this.errors.push('Passwords don\'t match!');
      }
      else {
           try {
            await this.$store.dispatch('inscription', {
              token: this.token,
              first_name: this.formFirstName,
              last_name: this.formLastName,
              gender: this.formGenre,
              email: this.formEmail,
              login: this.formLogin,
              birth_date: this.formdate,
              hire_date: this.formHire,
              role: this.formRole,
              password: this.formPassword
            })
          this.show = false;
          this.$router.push("/home");
          this.notifs = this.notifs + 1;
          this.$store.state.authUser.notifs.total_notifs = this.notifs;
          this.navbar = this.navbar + 1;
          } catch (e) {
            this.formError = e.message
          }
      }
    }
  }
}
</script>

<style>

.col-4 {
  color:white;
}

</style>

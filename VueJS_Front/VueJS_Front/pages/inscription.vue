<template>
  <div class="container">
    <table class="table table-striped">
      <tbody>
        <tr>
          <td colspan="1">
            <form
              class="well form-horizontal"
              @submit.prevent="inscription">
              <fieldset>
                <div class="form-group">
                  <label class="col-md-4 control-label">First Name</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div
                      class="input-group">
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-user"/>
                      </span>
                      <input
                        id="fullName"
                        v-model="formFirstName"
                        name="fullName"
                        placeholder="Full Name"
                        class="form-control"
                        required="true"
                        value=""
                        type="text"></div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-4 control-label">Last Name</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-home"/>
                      </span>
                      <input
                        id="Last_Name"
                        v-model="formLastName"
                        name="last_nameName"
                        placeholder="Last Name"
                        class="form-control"
                        required="true"
                        value=""
                        type="text"></div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-4 control-label">Role</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div class="input-group">
                      <span
                        class="input-group-addon"
                        style="max-width: 100%;">
                        <i class="glyphicon glyphicon-list"/>
                      </span>
                      <select
                        v-model="formRole"
                        class="selectpicker form-control">
                        <option
                          v-for="option in options"
                          :key="option.id"
                          :value="option.id">{{ option.label }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-4 control-label">Gender</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div class="input-group">
                      <span
                        class="input-group-addon"
                        style="max-width: 100%;">
                        <i class="glyphicon glyphicon-list"/>
                      </span>
                      <select
                        v-model="formGenre"
                        class="selectpicker form-control">
                        <option
                          v-for="option in GenreOption"
                          :key="option.id"
                          :value="option.id">{{ option.label }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-4 control-label">Birth Date</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-home"/>
                      </span>
                      <input
                        id="birth_date"
                        v-model="formdate"
                        name="birth_date"
                        placeholder="Birth date"
                        class="form-control"
                        required="true"
                        value=""
                        type="date"></div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label">Hire Date</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-home"/>
                      </span>
                      <input
                        id="hire_date"
                        v-model="formHire"
                        name="hire_date"
                        placeholder="Hire date"
                        class="form-control"
                        required="true"
                        value=""
                        type="date"></div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label">Login</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-home"/>
                      </span>
                      <input
                        id="login"
                        v-model="formLogin"
                        name="login"
                        placeholder="Login"
                        class="form-control"
                        required="true"
                        value=""
                        type="text"></div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-4 control-label">Email</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-envelope"/>
                      </span>
                      <input
                        id="email"
                        v-model="formEmail"
                        name="email"
                        placeholder="Email"
                        class="form-control"
                        required="true"
                        value=""
                        type="text"></div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label">Password</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-envelope"/>
                      </span>
                      <input
                        id="pass"
                        v-model="formPassword"
                        name="password"
                        placeholder="Password"
                        class="form-control"
                        required="true"
                        value=""
                        type="password"></div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-md-4 control-label">Confirm Password</label>
                  <div class="col-md-8 inputGroupContainer">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-envelope"/>
                      </span>
                      <input
                        id="passConf"
                        v-model="formPasswordConf"
                        name="passwordConf"
                        placeholder="Confirm Password"
                        class="form-control"
                        required="true"
                        value=""
                        type="password"></div>
                  </div>
                </div>
              </fieldset>
              <button
                type="submit"
                class="btn btn-primary"
                value="Submit">Inscription</button>
              <p
                v-if="formError"
                class="error">{{ formError }}</p>

              <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li
                    v-for="error in errors"
                    :key="error.formError">{{ error }}</li>
                </ul>
              </p>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        token: this.$store.state.authUser.data.token,
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
        GenreOption: [{id: 'M', label: 'Homme'}, {id: 'F', label: 'Femme'} ],
        options: [ {id: 'ag', label: 'Agent'}, {id: 'ch', label: 'Chief'}, {id: 'de', label: 'Detective'} ]
      }
    },
  middleware : 'auth',
  methods : {
    async inscription() {
      console.log('inscription')
      this.errors = [];
      if (!this.formFirstName) {
        this.errors.push('First Name required.');
      }
      if (!this.formLastName) {
        this.errors.push('Last Name required.');
      }
      if (!this.formEmail) {
        this.errors.push('Email required.');
      }
      if (!this.formLogin) {
        this.errors.push('Login required.');
      }
      if (!this.formdate) {
        this.errors.push('Date required.');
      }
      if (!this.formGenre) {
        this.errors.push('Genre required.');
      }
      if (!this.formRole) {
        this.errors.push('Role required.');
      }
      if (!this.formHire) {
        this.errors.push('Hire required !');
      }
      if (this.formPassword !== this.formPasswordConf) {
        this.errors.push('Error Password !');
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
          } catch (e) {
            this.formError = e.message
          }
      }
    }
  }
}
</script>

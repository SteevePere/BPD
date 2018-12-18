<template>
  <div
    class="container"
    style="margin-top: 10%;">
    <div class="login">
      <img
        class="logo"
        style="margin-bottom: 15px;"
        src="~/assets/bpd-badge.png">
      <h1 class="Content_Title">Boston Police Department</h1>
      <form @submit.prevent="login">
        <div
          class="bodyForm">
          <p
            style="margin-bottom: 10px;"
          ><input
            v-model="formUsername"
            type="text"
            class="form-control here"
            style="width: 275px; margin-top:30px; margin-left:auto; margin-right: auto;"
            placeholder="Login"
            name="username"
            required="true"></p>
          <p
            style="color:white;"
          ><input
            v-model="formPassword"
            type="password"
            class="form-control here"
            style="width: 275px; margin:auto;"
            placeholder="Password"
            name="password"
            required="true"></p>
        </div>
        <button
          type="submit"
          class="submit"
          style="float: center; margin-top: 20px; width: 175px;">Sign In</button>
        <p
          v-if="formError"
          class="error">{{ formError }}</p>
      </form>
    </div>
  </div>
</template>

<script>
  //import Inscription from '~/components/Inscription'
  //import Cookie from 'js-cookie'

export default {
  components: {
    //Inscription
  },
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: '',
      isDisplay: false,
      token: '',
      notifs: ''
    }
  },
  methods: {
    signin: function() {
      this.$router.push('/inscription')
    },
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
        this.token = this.$store.state.authUser.data.token
        this.notifs = this.$store.state.authUser.notifs.total_notifs
        this.$router.push({ name: 'home', params: { just_logged_in: true }})
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style>
body {
  /* background: white; */
  background: #1a2633;
}

.bodyForm {
  display: contents;
  text-align: center;
  max-width: 200px;
}
.container {
  padding: 0;
  padding-bottom: 0px;
  max-width: 100%;
  /* background-color: white; */
  background-color: #2A3F54;
}

.Content_Title {
  color:white;
}

.error {
  margin-top: 15px;
  margin-bottom: 0;
  color: #ff3333;
}

/* .login {
  text-align: center;
  padding: 30px;
} */

.login {

  text-align: center;
  padding: 30px;
  top: calc(50% - 150px);
  left: calc(50% - 150px);
  /* width: 300px; */
  /* height: 300px; */
  border-radius: 0%;
  box-shadow:
    0 0 20px #fff,
    -10px 0 40px #fff,
    10px 0 100px #fff;
}

.logo {
  max-height: 250px;
  margin-left: 0%;
}

.btnInfo {
  margin-top: 10px;
}

.form-control:valid {
  background-color:  #fff!important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}

.submit {
  color: #fff;
  padding-right: 15px;
  background-color: #6c757d;
  border-color: #6c757d;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  margin-right: 0;
  -webkit-animation-name: whitePulse;
  -webkit-animation-duration: 3s;
  -webkit-animation-iteration-count: infinite;
  cursor:pointer;
}

@-webkit-keyframes whitePulse {
  from { background-color: rgba(255, 255, 255, 0.30); -webkit-box-shadow: 0 0 9px rgba(255, 255, 255, 0.40); }
  50% { background-color: rgba(255, 255, 255, 0.30); -webkit-box-shadow: 0 0 9px #fff; }
  to { background-color: rgba(255, 255, 255, 0.30); -webkit-box-shadow: 0 0 9px #1a2633; }
}
</style>

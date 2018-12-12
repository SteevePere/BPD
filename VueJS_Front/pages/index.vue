<template>
  <div
    class="container"
    style="margin-top: 10%;">
    <div class="login">
      <img
        class="logo"
        style="margin-bottom: 10px;"
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
          class="btn btn-secondary"
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
      token: ''
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
        /*setTimeout(() => {
        const auth = {
          accessToken: this.token
        }
        this.$store.commit('update', auth) // muter `auth` dans le store pour le rendu client
        Cookie.set('auth', auth) // sauver le jeton dans un cookie pour le rendu serveur
      }, 10000)*/
        this.$router.push('/home')
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

.login {
  text-align: center;
  padding: 30px;
}

.logo {
  max-height: 230px;
  margin-left: 0%;
}

.btnInfo {
  margin-top: 10px;
}
</style>

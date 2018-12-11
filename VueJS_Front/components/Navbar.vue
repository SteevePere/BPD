<template>
  <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul
        class="navbar-nav mr-auto">
        <nuxt-link to="/home">
          <img
            class="logo"
            src="~/assets/bpd-badge.png"
            title="Home"
            style="height: 60px; margin: 0 20px 0 5px;"></nuxt-link>
        <li class="nav-item active">
          <a class="nav-link">
            <nuxt-link
              to="/home"
              class="admin">Home</nuxt-link>
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li
          v-if="role === 'chief'"
          class="nav-item"
        >
          <a
            class="nav-link">
            <nuxt-link
              to="/admin"
              class="admin">Control Panel</nuxt-link>
            <i class="fa fa-envelope-o">
              <span class="badge badge-danger">1</span>
            </i>
          </a>
        </li>
        <li
          class="nav-item"
        >
          <a
            class="nav-link">
            <nuxt-link
              to="/inscription"
              class="admin">New User</nuxt-link>
          </a>
        </li>
      </ul>
      <b-button
        class="user"
        title="Sign Out"
        style="margin-right: 10px; background: transparent;"
        @click="logout">
        <img
          src="~/assets/logout.png"
          style="height: 30px;">
      </b-button>
    </div>
  </nav>
</template>

<script>
	export default {
		data () {
	    return {
	      role: this.$store.state.authUser.data.role
	    }
	  },
		middleware : 'auth',
		methods: {
      async logout() {
        try {
          await this.$store.dispatch('logout')
          this.$router.push('/')
        } catch (e) {
          this.formError = e.message
        }
      }
		}
	}
</script>

<style>
.admin {
	color: #c7d7e8;
	text-decoration: none;
}

.admin:hover {
	color: #fff;
	text-decoration: none;
}


.user {
	margin-left:10px;
	font-family: Arial, Helvetica, sans-serif;
	font-style: oblique;
	border-radius: 10px;

}

.navbar-expand-lg .navbar-nav .nav-link {
  padding-top: 16px;
}
</style>

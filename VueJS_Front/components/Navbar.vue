<template>
  <div id="navbar-wrapper">
    <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul
          class="navbar-nav mr-auto">
          <a
            href="https://twitter.com/bostonpolice?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            target="_blank" >
            <img
              class="logo"
              src="~/assets/bpd-badge.png"
              title="Boston Police Twitter Page"
              style="height: 60px; margin: 0 20px 0 5px; padding-left:80px;"></a>
          <li class="nav-item active">
            <a class="nav-link">
              <nuxt-link
                to="/home"
                class="admin"
                style="margin-left:70px;">Home</nuxt-link>
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
  </div>
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

#navbar-wrapper {
    z-index: 1000;
    position: fixed;
    left: 0;
    top:0;
    width: 100%;
    height: 10%;
    /* margin-right: -250px; */
    overflow-y: auto;
    /* background: rgb(33, 37, 41); */
    /* -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease; */
}

.user {
	margin-left:10px;
	font-family: Arial, Helvetica, sans-serif;
	font-style: oblique;
	border-radius: 10px;

}

.nav-link {
    margin-right: 15px;
}

navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark {
  position:sticky;
}

.navbar-expand-lg .navbar-nav .nav-link {
  padding-top: 17px;
}
</style>

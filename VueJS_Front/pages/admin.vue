<template>
  <div class="content">
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
    <div class="content-admin">
      <div style="margin-top: 140px; text-align: center; ">
        <h4
          style="color: white;"
        >Accounts currently pending :</h4>
      </div>
      <div class="table">
        <b-table
          :striped="true"
          :outlined="true"
          :fields="col"
          :items="dataobjct"
          :busy.sync="isBusy"
          :ref="pending_users">
          <template
            slot="Actions"
            slot-scope="row">
            <b-button
              size="sm"
              @click="activate(row.item.id)">Activate</b-button>
          </template>
        </b-table>
        <br>
        <b-button
          type="button"
          name="button"
          style="margin-left: 43%;"
          @click="getCSV">Export all users to CSV file</b-button>
        <p
          v-if="formError"
          class="error">{{ formError }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  async fetch ({store}) {
    await store.dispatch('pendingAll',{
      token: store.state.authUser.data.token,
    });
  },
  components: {
    Navbar
  },
  data () {
    return {
      role: this.$store.state.authUser.data.role,
      token: this.$store.state.authUser.data.token,
      col: ["id","role","login","first_name","last_name",
      "hire_date",
      'created_by',
      'Actions'],
      loading: false,
      dataobjct: this.$store.state.Pending.data,
      formError: null,
      isBusy: false,
      formSuccess: null,
      pending_users: null
    }
  },
  middleware : 'auth',
  methods : {
    async getAllPending() {
      try {
        await this.$store.dispatch('pendingAll',{
          token: this.token
        })
      } catch (e) {
        this.formError = e.message
      }
    },
    async getCSV() {
      await this.$store.dispatch('GetCsv',{
        token: this.token
      })
    },
    activate(id)
    {
      return this.$store.dispatch('validate',{
        token: this.token,
        id: id
      }).then(() => {
        this.dataobjct = this.$store.state.Pending.data
        this.vuetable.setData(this.dataobjct);
      })
    }
  }
}
</script>

<style>

.content-admin {
  margin-left: 185px;
}

.table {
  margin:auto;
  /* margin-left: 175px; */
  margin-top: 50px;
  width: 100%;
}

.table .table {
  background-color: rgb(136, 166, 195);
  padding: 25px;
  border: 0px;
}

table.b-table {
  float: center;
  max-width: 70%;
  border-radius: 0;
}

</style>

<template>
  <div class="content">
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
      style="margin-left: 400px; margin-top: 140px; max-width: 70%;">
      <div
        class="card"
        style="margin-bottom: 50px; background: rgb(42, 63, 84);">
        <div
          class="card-body"
          style="margin-left: 30px; margin-right: 30px;">
          <div
            class="row"
            style="margin-right: 0;">
            <div class="col-md-12">
              <div class="content-admin">
                <div style="margin-top: 50px; text-align: center; ">
                  <h4
                    v-if="dataobjct[0]"
                    style="color: white;"
                  >Accounts Awaiting Review</h4>
                  <h4
                    v-else
                    style="color: white;"
                  >Nothing to review for now. Good job, chief!</h4>
                </div>
                <div class="table">
                  <b-table
                    v-if="dataobjct[0]"
                    :key = "pending_table"
                    :striped="true"
                    :hover="true"
                    :fixed="false"
                    :sort-by.sync="sortById"
                    :sort-desc.sync="sortDesc"
                    :fields="col"
                    :items="dataobjct"
                    :busy.sync="isBusy"
                    :ref="pending_users"
                    style="max-width: 100%;">
                    <template
                      slot="Actions"
                      slot-scope="row">
                      <b-button
                        size="sm"
                        class="btn btn-success"
                        style="width: 80px;"
                        @click="activate(row.item)">Activate</b-button>
                    </template>
                  </b-table>
                  <br>
                  <b-button
                    type="button"
                    name="button"
                    class="btn btn-info"
                    style="margin-left:73%; background-color: #337ab7; border-color: #337ab7;"
                    @click="getCSV">Export all users to CSV file</b-button>
                  <p
                    v-if="formError"
                    class="error">{{ formError }}</p>
                </div>
                <div style="margin-top: 0px; text-align: center; ">
                  <h4
                    style="color: white;"
                  >All Users</h4>
                </div>
                <div class="table">
                  <b-table
                    v-if="dataobjct2[0]"
                    :key = "all_table"
                    :striped="true"
                    :hover="true"
                    :fixed="false"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :fields="col2"
                    :items="dataobjct2"
                    :busy.sync="isBusy"
                    :ref="all_users"
                    style="max-width: 100%;">
                    <template
                      slot="Actions"
                      slot-scope="row">
                      <b-button
                        v-if="row.item.role != 'chief' && row.item.status != 'OFF'"
                        size="sm"
                        class="btn btn-danger"
                        style="width: 80px;"
                        @click="block(row.item)">Suspend</b-button>
                    </template>
                  </b-table>
                  <br>
                  <p
                    v-if="formError"
                    class="error">{{ formError }}</p>
                </div>
              </div>
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
  async fetch ({store}) {
    await store.dispatch('pendingAll',{
      token: store.state.authUser.data.token,
    });
    await store.dispatch('usersAll',{
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
      notifs: this.$store.state.authUser.notifs.total_notifs,
      col: [
        { key: 'id', sortable: true },
        { key: 'role', sortable: true },
        { key: 'login', sortable: true },
        { key: 'first_name', sortable: true },
        { key: 'last_name', sortable: true },
        { key: 'hire_date', sortable: true },
        { key: 'created_by', sortable: true },
        { key: 'Actions', sortable: false },
      ],
      col2: [
        { key: 'id', sortable: true },
        { key: 'role', sortable: true },
        { key: 'login', sortable: true },
        { key: 'first_name', sortable: true },
        { key: 'last_name', sortable: true },
        { key: 'status', sortable: true },
        { key: 'created_by', sortable: true },
        { key: 'Actions', sortable: false },
      ],
      loading: false,
      dataobjct: this.$store.state.Pending.data,
      dataobjct2: this.$store.state.AllUsers.data,
      formError: null,
      isBusy: false,
      formSuccess: null,
      pending_users: null,
      all_users: null,
      navbar: 0,
      pending_table: 0,
      all_table: 0,
      sortBy: 'status',
      sortById: 'id',
      sortDesc: false,
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
    async getAllUsers() {
      try {
        await this.$store.dispatch('usersAll',{
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
    activate(item)
    {
      return this.$store.dispatch('validate',{
        token: this.token,
        id: item.id
      }).then(() => {
        this.notifs = this.notifs -1;
        this.$store.state.authUser.notifs.total_notifs = this.notifs;
        this.navbar = this.navbar + 1;
        this.dataobjct = this.$store.state.Pending.data;
        var id = item.id
        console.log(this.dataobjct2)
        for (var i = 0; i < this.dataobjct2.length; i++)
        {
          if (this.dataobjct2[i].id == id) {
            this.dataobjct2[i].status = 'ON';
          }
        }
        if (this.dataobjct == []) {
          this.message = "ok";
        }
        this.pending_table = this.pending_table + 1;
      })
    },
    block(item)
    {
      console.log(item)
      return this.$store.dispatch('block',{
        token: this.token,
        id: item.id
      }).then(() => {
        item.status = 'OFF';
        this.notifs = this.notifs +1;
        this.$store.state.authUser.notifs.total_notifs = this.notifs;
        this.navbar = this.navbar + 1;
        this.dataobjct = this.$store.state.Pending.data;
        this.dataobjct2 = this.$store.state.AllUsers.data;
        if (this.dataobjct == []) {
          this.message = "ok";
        }
        this.pending_table = this.pending_table + 1;
        this.all_table = this.all_table + 1;
      })
    }

  }
}
</script>

<style>

.content-admin {
  /* margin-left: 185px; */
}

.table {
  margin:auto;
  /* margin-left: 175px; */
  margin-top: 50px;
  width: 100%;
  border-radius: 5px;

}

.table .table {
  /* color: #bfbfbf; */
  /* background: #2A3F54; */
  padding: 25px;
  border: 0px;
  border-radius: 5px;

}

table.b-table {
  max-width: 90%;
  border-radius: 5px;
  /* background-color: rgba(0, 231, 255, 0.9); */
  /* border: 10px solid white !important; */
}

.table thead th {
  border-top: 0 !important;
}
</style>

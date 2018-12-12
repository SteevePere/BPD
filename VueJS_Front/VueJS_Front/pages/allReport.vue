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
    <b-button
      style="margin: 50px 0 0 395px;"
      to="/crimes">New Report</b-button>
    <div class="table_all_reports">
      <b-table
        :striped="true"
        :outlined="true"
        :fields="col"
        :items="dataobjct"
        style="margin-left: 20%;">
        <template
          slot="view_and_manage"
          slot-scope="row">
          <b-button
            v-model="row.detailsShowing"
            size="sm"
            class="mr-2"
            @click.native.stop
            @change="row.toggleDetails"
            @click.stop="row.toggleDetails">
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
        </template>
        <template
          slot="row-details"
          slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Compnos:</b></b-col>
              <b-col>{{ row.item.compnos }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Nature Code:</b></b-col>
              <b-col>{{ row.item.naturecode }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Incident Type:</b></b-col>
              <b-col>{{ row.item.incident_type_description }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Shooting:</b></b-col>
              <b-col>{{ row.item.shooting }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Domestic:</b></b-col>
              <b-col>{{ row.item.domestic }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Shift:</b></b-col>
              <b-col>{{ row.item.shift }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Month:</b></b-col>
              <b-col>{{ row.item.month }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Day of the week:</b></b-col>
              <b-col>{{ row.item.day_week }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Ucrpart:</b></b-col>
              <b-col>{{ row.item.ucrpart }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>X Coordinate:</b></b-col>
              <b-col>{{ row.item.x }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Y Coordinate:</b></b-col>
              <b-col>{{ row.item.y }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                sm="3"
                class="text-sm-right"><b>Cross Street:</b></b-col>
              <b-col>{{ row.item.xstreetname }}</b-col>
            </b-row>
            <br>
            <b-button
              :to="{ name: 'edit', params: { compnos:row.item.compnos, formNature:row.item.naturecode, crimecode:row.item.main_crimecode, incident:row.item.incident_type_description, district:row.item.reptdistrict, reporting:row.item.reptdistrict, fromdate:row.item.fromdate, weapontype:row.item.weapontype, shooting:row.item.shooting, shift:row.item.shift, year:row.item.year, month:row.item.month, day_week:row.item.day_week, ucrpart:row.item.ucrpart, formX:row.item.x, formY:row.item.y, streetname:row.item.streetname, xstreetname:row.item.xstreetname, location:row.item.location }}"
              size="sm">Edit</b-button>
            <b-button
              size="sm"
              style="background-color: #dc3545; border-color: #dc3545;"
              @click="getCurentId(row.item.Compnos)">Delete</b-button>
            <b-button
              size="sm"
              @click="row.toggleDetails">Hide Details</b-button>
          </b-card>
        </template>
      </b-table>
    </div>
    <br>
    <b-pagination
      :total-rows="100"
      :per-page="10"
      v-model="currentPage"
      style="margin-left: 45%;"
      @input="getPostData(currentPage)"
    />
    <br>
    <p
      v-if="formError"
      class="error">{{ formError }}</p>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
//import AllReports from '~/components/AllReports'

export default {
  watchQuery: ['home'],
  async fetch ({store}) {
    await store.dispatch('GetAllreport',{
      token: store.state.authUser.data.token,
    });
  },
  /*async asyncData () {
    console.log('GetReport')
    this.loading = true
    try {
      console.log('GetReport')
      await this.$store.dispatch('GetAllreport', {
        token: this.token,v
      },
      console.log(token))
    } catch (e) {
      this.formError = e.message
    }
  },*/
  components: {
    Navbar
  },
  data () {
    return {
      currentPage: 1,
      col: ["compnos","naturecode","main_crimecode","reptdistrict",
      "fromdate",
      "weapontype",
      "streetname",
      'view_and_manage'],
      loading: false,
      role: this.$store.state.authUser.data.role,
      token: this.$store.state.authUser.data.token,
      dataobjct: this.$store.state.Repport.data,
      formError: null
      }
  },
  middleware : 'auth',
    methods : {
      async GetAllreport() {
        console.log('GetReport')
        try {
          await this.$store.dispatch('GetAllreport', {
            token: this.token,
          })
        } catch (e) {
          this.formError = e.message
        }
      },
      async getPostData (pageNum) {
          console.log('currentPage')
          return this.$store.dispatch('GetAllreportNavigation', {
              page: pageNum,
              token: this.token,
            }).then((res) => {
              console.log(res.data)
              this.dataobjct = res.data
            })
      },
      mounted(currentPage){
      this.getPostData(currentPage)
    },
    getCurentId(id)
    {
      console.log(id)
    }
    }

}

</script>

<style>

.table_all_reports {
  margin-left: 100px;
  margin-top: 50px;
}

.table_all_reports .table {
  background-color: rgb(136, 166, 195);
  padding: 25px;
  border: 0px;
}

table.b-table {
  max-width: 70%;
  border-radius: 0px;
  background-color: rgb(136, 166, 195);
}

.card {
  background: #2A3F54;
}

.text-sm-right {
  color: white;
}

.col {
  color: white;
}
</style>

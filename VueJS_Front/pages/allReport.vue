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
    <div style="margin-top: 130px; margin-left: 150px; text-align: center; ">
      <h4
        style="color: white;"
      >All Reports</h4>
      <br>
    </div>
    <div
      class="col-md-9"
      style="margin-left: 400px; margin-top: 30px; max-width: 70%;">
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
              <p
                style="margin:30px 0 20px 0;">
                <b-button
                  v-if="role === 'chief' || role === 'detective'"
                  style="margin: 0 0 0 0px; float:left; background-color: rgb(51, 122, 183); border-color: rgb(51, 122, 183);"
                  class="btn btn-primary"
                  to="/crimes">File New Report</b-button>
                <select
                  v-model="field"
                  class="form-control here"
                  style="width: 25%; float:right; margin-right:0px; margin-left: 5px;"
                  required>
                  <option
                    v-for="option in optionField"
                    :key="option.id"
                    :value="option.id">{{ option.label }}</option>
              </select></p>
              <input
                v-model="keyword"
                class="form-control here"
                type="text"
                placeholder="Search Reports..."
                style="width: 25%; float:right; "
                required
                @keyup="search()">
              <br
                style="height:0px;">
              <div class="table_all_reports">
                <b-table
                  :key = "reports_table"
                  :striped="true"
                  :hover="true"
                  :fixed="false"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :fields="col"
                  :items="dataobjct"
                  :busy.sync="isBusy"
                  :ref="table">
                  <template
                    slot="view_and_manage"
                    slot-scope="row">
                    <b-button
                      v-if="!row.detailsShowing"
                      v-model="row.detailsShowing"
                      size="sm"
                      class="mr-2"
                      @click.native.stop
                      @change="row.toggleDetails"
                      @click.stop="row.toggleDetails">
                      Show Details
                    </b-button>
                    <b-button
                      v-if="row.detailsShowing"
                      size="sm"
                      @click="toggle_details(row.item)">Hide Details</b-button>
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
                        v-if="role === 'chief' || role === 'detective'"
                        :to="{ name: 'edit', params: { compnos:row.item.compnos, formNature:row.item.naturecode, crimecode:row.item.main_crimecode, incident:row.item.incident_type_description, district:row.item.reptdistrict, reporting:row.item.reptdistrict, fromdate:row.item.fromdate, weapontype:row.item.weapontype, shooting:row.item.shooting, domestic:row.item.domestic, shift:row.item.shift, year:row.item.year, month:row.item.month, day_week:row.item.day_week, ucrpart:row.item.ucrpart, formX:row.item.x, formY:row.item.y, streetname:row.item.streetname, xstreetname:row.item.xstreetname, location:row.item.location }}"
                        size="sm"
                        class="btn btn-primary"
                        style="background-color: #007bff; border-color: #007bff;">Edit</b-button>
                      <b-button
                        v-if="role === 'chief' && confirm === false"
                        size="sm"
                        style="background-color: #dc3545; border-color: #dc3545;"
                        @click="toggle_confirm()">Delete</b-button>
                      <b-button
                        v-if="role === 'chief' && confirm === true"
                        size="sm"
                        style="background-color: #dc3545; border-color: #dc3545; border-radius: 5px 0 0 5px;"
                        @click="deleteReport(row)">Confirm delete</b-button>
                      <b-button
                        v-if="role === 'chief' && confirm === true"
                        size="sm"
                        class="btn btn-success"
                        style="margin-left: -5px; border-radius: 0 5px 5px 0; border-left: 1px solid white;"
                        @click="toggle_confirm()">Cancel delete</b-button>
                      <b-button
                        size="sm"
                        @click="toggle_details(row.item)">Hide Details</b-button>
                      <p
                        v-if="formSuccess"
                        style="margin-left: 35px;"
                        class="error">{{ formSuccess }}</p>
                      <p
                        v-if="formWarning"
                        style="margin-left: 30px;"
                        class="error">{{ formWarning }}</p>
                    </b-card>
                  </template>
                </b-table>
              </div>
            </div>
          </div>
          <br>
          <b-pagination
            :total-rows="100"
            :per-page="10"
            v-model="currentPage"
            style="margin-left: 37%;"
            @input="getPostData(currentPage)"
          />
        </div>
      </div>
    </div>
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
  components: {
    Navbar
  },
  data () {
    return {
      currentPage: 1,
      col: [
        { key: 'compnos', sortable: true },
        { key: 'naturecode', sortable: true },
        { key: 'main_crimecode', sortable: true },
        { key: 'reptdistrict', sortable: true },
        { key: 'fromdate', sortable: true },
        { key: 'weapontype', sortable: true },
        { key: 'streetname', sortable: true },
        { key: 'view_and_manage', sortable: false },
      ],
      loading: false,
      role: this.$store.state.authUser.data.role,
      token: this.$store.state.authUser.data.token,
      dataobjct: this.$store.state.Repport.data,
      searchobjct: null,
      formError: null,
      isBusy: false,
      formSuccess: null,
      formWarning: null,
      field:'weapontype',
      keyword:'',
      table:null,
      sortBy: 'compnos',
      sortDesc: false,
      confirm: false,
      reports_table: 0,
      optionField: [{id: 'weapontype', label: 'By Weapon Type'}, {id: 'naturecode', label: 'By Nature Code'}, {id: 'main_crimecode', label: 'By Crime Code'}, {id: 'reptdistrict', label: 'By District'}, {id: 'fromdate', label: 'By Date'}, {id: 'streetname', label: 'By Street Name'}, {id: 'shift', label: 'By Shift'}, {id: 'day_week', label: 'By Day of the Week'}, {id: 'incident_type_description', label: 'By Incident Type'}],
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
        this.formSuccess = ''
        return this.$store.dispatch('GetAllreportNavigation', {
            page: pageNum,
            token: this.token,
          }).then((res) => {
            console.log(res.data)
            this.dataobjct = res.data
          })
    },
    async search () {
      try {
        await this.$store.dispatch('Search', {
            field: this.field,
            keyword: this.keyword,
            token: this.token,
          }).then(() => {
            this.dataobjct = this.$store.state.Search.matching_reports
            this.vuetable.setData(this.dataobjct);
          })
      } catch (e) {
        this.formError = e.message
      }
    },
    mounted(currentPage){
      this.getPostData(currentPage),
      this.formSuccess = ''
    },
    deleteReport(row) {
      return this.$store.dispatch('DeleteReport',{
        token: this.token,
        compnos: row.item.compnos
      }).then((res) => {
        this.formWarning = null;
        this.formSuccess = res.message
        setTimeout(() => this.dataobjct.splice(row, 1), 2500);
        // this.dataobjct.splice(row, 1)
      })
    },
    toggle_confirm() {
      this.confirm = !this.confirm;
      if (this.confirm == true) {
        this.formWarning = "Are you sure you want to do this?";
      } else {
        this.formWarning = null;
      }
    },
    toggle_details(row) {
      if (row._showDetails) {
      row._showDetails = false;
    } else {
      row._showDetails = true;
    }
      this.confirm = false;
      this.formWarning = null;
    }
  }
}

</script>

<style>

.table_all_reports {
  margin-left: 0px;
  margin-top: 55px;
  max-width: 100%;
}

.table_all_reports .table {
  padding: 25px;
  border: 0px;
  border-radius: 5px;
  background-color: white;
  max-width: 100%;
}

table.b-table {
  max-width: 100%;
  border-radius: 0px;
}

.table thead th {
  border-top: 0 !important;
}

.card {
  background: #1a2633;
}

.text-sm-right {
  color: white;
}

.col {
  color: white;
}
</style>

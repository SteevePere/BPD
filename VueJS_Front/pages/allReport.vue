<template>
  <div>
    <Navbar/>
    <b-table
      :fields="col"
      :items="dataobjct">
      <template
        slot="show_details"
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
              class="text-sm-right"><b>Nature code:</b></b-col>
            <b-col>{{ row.item.naturecode }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"><b>Incident type:</b></b-col>
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
              class="text-sm-right"><b>Day Week:</b></b-col>
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
              class="text-sm-right"><b>X:</b></b-col>
            <b-col>{{ row.item.x }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"><b>Y:</b></b-col>
            <b-col>{{ row.item.y }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col
              sm="3"
              class="text-sm-right"><b>Xstreetname:</b></b-col>
            <b-col>{{ row.item.xstreetname }}</b-col>
          </b-row>
          <b-button
            size="sm"
            @click="getCurentId(row.item.Compnos)">Delete</b-button>
          <b-button
            size="sm"
            @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
    <b-pagination
      :total-rows="100"
      :per-page="10"
      v-model="currentPage"
      align="center"
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
        token: this.token,
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
      col: ["compnos","naturecode","main_crimecode","reptdistrict","reportingarea",
      "fromdate",
      "weapontype",
      "year",
      "streetname",
      "location",
      'show_details'],
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

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
    <div
      class="col-md-9"
      style="margin-left: 360px; margin-top: 140px; max-width: 70%;">
      <div
        class="card"
        style="margin-bottom: 50px; background: rgb(42, 63, 84);">
        <div
          class="card-body"
          style="margin-left: 30px; margin-right: 30px;">
          <div class="row">
            <div class="col-md-12">
              <div style="margin-top: 50px; text-align: center; ">
                <h4
                  style="color: white;"
                >New Report</h4>
                <br>
              </div>
            </div>
          </div>
          <br>
          <br>
          <div class="row">
            <div class="col-md-12">
              <form @submit.prevent="report()">
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Compnos</label>
                  <div class="col-8">
                    <p><input
                      v-model="formCompnos"
                      class="form-control here"
                      length="10"
                      type="number"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Nature Code</label>
                  <div class="col-8">
                    <p><input
                      v-model="formNature"
                      class="form-control here"
                      max="10"
                      type="text"
                      name="crime"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Incident Type</label>
                  <div class="col-8">
                    <p><input
                      v-model="incident"
                      class="form-control here"
                      type="text"
                      name="incident"
                      max="200"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Crime Code</label>
                  <div class="col-8">
                    <p><input
                      v-model="crimecode"
                      class="form-control here"
                      type="text"
                      name="crime"
                      max="15"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">District</label>
                  <div class="col-8">
                    <p><input
                      v-model="district"
                      class="form-control here"
                      type="text"
                      name="district"
                      max="100"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Reporting Area</label>
                  <div class="col-8">
                    <p><input
                      v-model="reporting"
                      class="form-control here"
                      type="text"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Weapon Type</label>
                  <div class="col-8">
                    <p><select
                      v-model="weapontype"
                      class="form-control here">
                      <option
                        v-for="option in optionWeapon"
                        :key="option.id"
                        :value="option.id">{{ option.label }}</option>
                    </select></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Shooting</label>
                  <div class="col-8">
                    <p><input
                      v-model="shooting"
                      class="form-check-input"
                      style="margin-left: 0px;"
                      type="checkbox"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Domestic Violence</label>
                  <div class="col-8">
                    <p><input
                      v-model="domestic"
                      class="form-check-input"
                      style="margin-left: 0px;"
                      type="checkbox"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Date</label>
                  <div class="col-8">
                    <p><input
                      v-model="fromdate"
                      class="form-control here"
                      type="date"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Year</label>
                  <div class="col-8">
                    <p><input
                      v-model="year"
                      class="form-control here"
                      type="number"
                      max="9999"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Month</label>
                  <div class="col-8">
                    <p><input
                      v-model="month"
                      class="form-control here"
                      type="number"
                      max="12"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Day of the Week</label>
                  <div class="col-8">
                    <p><select
                      v-model="day_week"
                      class="form-control here"
                      required>
                      <option
                        v-for="option in options"
                        :key="option.id"
                        :value="option.id">{{ option.label }}</option>
                    </select></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Shift</label>
                  <div class="col-8">
                    <p><select
                      v-model="shift"
                      class="form-control here">
                      <option
                        v-for="option in optionShift"
                        :key="option.id"
                        :value="option.id">{{ option.label }}</option>
                    </select></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Universal Crime Reporting Part Number</label>
                  <div class="col-8">
                    <p><select
                      v-model="ucrpart"
                      class="form-control here"
                      required>
                      <option
                        v-for="option in optionUcrpart"
                        :key="option.id"
                        :value="option.id">{{ option.label }}</option>
                    </select></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">X Coordinate</label>
                  <div class="col-8">
                    <p><input
                      v-model="formX"
                      class="form-control here"
                      type="number"
                      step="0.0001"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Y Coordinate</label>
                  <div class="col-8">
                    <p><input
                      v-model="formY"
                      class="form-control here"
                      type="number"
                      step="0.0001"></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Street Name</label>
                  <div class="col-8">
                    <p><input
                      v-model="streetname"
                      class="form-control here"
                      type="text"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Cross Street Name</label>
                  <div class="col-8">
                    <p><input
                      v-model="xstreetname"
                      class="form-control here"
                      type="text"
                      required></p>
                  </div>
                </div>
                <div class="form-group row">
                  <label
                    class="col-4 col-form-label">Location</label>
                  <div class="col-8">
                    <p><input
                      v-model="location"
                      class="form-control here"
                      type="text"
                      required></p>
                  </div>
                </div>
                <br>
                <button
                  class="btn btn-primary"
                  type="submit"
                  value="Submit"
                  to="/allReport"
                  name="button">Save Report</button>
                <b-button
                  to="/allReport"
                  title="My Profile"
                  class="btn btn-danger">Cancel</b-button>
              </form>
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
  components: {
    Navbar
  },
  data () {
    return {
      role: this.$store.state.authUser.data.role,
      token: this.$store.state.authUser.data.token,
      formError: null,
      formNature: '',
      crimecode: '',
      incident:'',
      district:'',
      reporting:'',
      fromdate:'',
      weapontype:'',
      shooting:'True',
      domestic:'True',
      shift:'',
      year:'',
      month:'',
      day_week:'',
      ucrpart:'',
      formX:'',
      formY:'',
      streetname:'',
      xstreetname:'',
      formCompnos:'',
      location:'',
      options: [ {id: 'Monday', label: 'Monday'}, {id: 'Tuesday', label: 'Tuesday'}, {id: 'Wednesday', label: 'Wednesday'},
      {id: 'Thursday', label: 'Thursday'}, {id: 'Friday', label: 'Friday'}, {id: 'Saturday', label: 'Saturday'},{id: 'Sunday', label: 'Sunday'} ],
      optionWeapon: [ {id: 'Unarmed', label: 'Unarmed'}, {id: 'Knife', label: 'Knife'},{id: 'Personal Weapon', label: 'Personal Weapon (hand, foot, etc)'}, {id: 'Firearm', label: 'Firearm'},
      {id: 'Other', label: 'Other'}],
      optionShift: [ {id: 'First', label: 'First'}, {id: 'Day', label: 'Day'}, {id: 'Last', label: 'Last'}],
      optionUcrpart: [ {id: 'Part One', label: 'Part One'}, {id: 'Part Two', label: 'Part Two'}, {id: 'Part Three', label: 'Part Three'},{id: 'Other', label: 'Other'}]
    }
  },
  middleware : 'auth',
    methods : {
      async report() {
        console.log('report')
        try {
          await this.$store.dispatch('report', {
            compnos: this.formCompnos,
            token: this.token,
            naturecode: this.formNature,
            incident_type_description: this.incident,
            main_crimecode: this.crimecode,
            reptdistrict: this.district,
            reportingarea: this.reporting,
            fromdate: this.fromdate,
            weapontype: this.weapontype,
            shooting: this.shooting,
            domestic: this.domestic,
            shift: this.shift,
            year: this.year,
            month:this.month,
            day_week:this.day_week,
            ucrpart:this.ucrpart,
            x:this.formX,
            y:this.formY,
            streetname:this.streetname,
            xstreetname:this.xstreetname,
            location: this.location
          })
          this.$router.push("/allReport");
        } catch (e) {
          this.formError = e.message
        }
      }
    }

}

</script>

<style>

.col-4 col-form-label {
  color:white;
}

.col-form-label {
  color: white;
}

</style>

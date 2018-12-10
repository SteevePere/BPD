<template>
  <div>
    <Navbar/>
    <table
      class="table table-striped"
      style="text-align:center">
      <tbody>
        <tr>
          <td colspan="1">
            <form @submit.prevent="edit()">
              <p>compnos: <input
                v-model="formCompnos"
                length="10"
                type="number"></p>
              <p>nature code: <input
                v-model="formNature"
                max="10"
                type="text"
                name="crime"
                required></p>
              <p>Incident : <input
                v-model="incident"
                type="text"
                name="incident"
                max="200"
                required></p>
              <p>main crimecode: <input
                v-model="crimecode"
                type="text"
                name="crime"
                max="15"
                required></p>
              <p>rept district: <input
                v-model="district"
                type="text"
                name="district"
                max="100"
                required></p>
              <p>reporting area: <input
                v-model="reporting"
                type="text"
                required></p>
              <p>fromdate: <input
                v-model="fromdate"
                type="datetime"
                required></p>
              <label for="weapon">weapon type:</label>
              <select
                v-model="weapontype"
                required>
                <option
                  value=""
                  disabled/>
                <option
                  v-for="option in optionWeapon"
                  :key="option.id"
                  :value="option.id">{{ option.label }}</option>
              </select>
              <p>shooting: <input
                v-model="shooting"
                type="checkbox"></p>
              <p>domestic: <input
                v-model="domestic"
                type="checkbox"></p>
              <label for="shift">Shift:</label>
              <select
                v-model="shift"
                required>
                <option
                  value=""
                  disabled/>
                <option
                  v-for="option in optionShift"
                  :key="option.id"
                  :value="option.id">{{ option.label }}</option>
              </select>
              <p>year: <input
                v-model="year"
                type="number"
                max="9999"
                required></p>
              <p>month: <input
                v-model="month"
                type="number"
                max="12"
                required></p>

              <label for="day_week">day week:</label>
              <select
                v-model="day_week"
                required>
                <option
                  value=""
                  disabled/>
                <option
                  v-for="option in options"
                  :key="option.id"
                  :value="option.id">{{ option.label }}</option>
              </select>
              <label for="ucrpart">ucrpart:</label>
              <select
                v-model="ucrpart"
                required>
                <option
                  value=""
                  disabled/>
                <option
                  v-for="option in optionUcrpart"
                  :key="option.id"
                  :value="option.id">{{ option.label }}</option>
              </select>
              <p>x: <input
                v-model="formX"
                type="number"
                required></p>
              <p>y: <input
                v-model="formY"
                type="number"
                required></p>
              <p>street name: <input
                v-model="streetname"
                type="text"
                required></p>
              <p>xstreet name: <input
                v-model="xstreetname"
                type="text"
                required></p>
              <p>location: <input
                v-model="location"
                type="text"
                required></p>
              <button
                class="btn btn-primary"
                type="submit"
                value="Submit"
                name="button">Save Report</button>
              <button
                class="btn btn-danger"
                type="button"
                name="button">Cancel</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
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
      shooting:'False',
      domestic:'False',
      shift:'',
      year:'',
      month:'',
      day_week:'',
      ucrpart:'',
      formX:'',
      formY:'',
      streetname:'',
      xstreetname:'',
      formCompnos:0,
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
      async edit() {
        try {
          await this.$store.dispatch('edit', {
            id: id,
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
        } catch (e) {
          this.formError = e.message
        }
      }
    }

}

</script>

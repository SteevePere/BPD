<script>

import {Line} from 'vue-chartjs';

export default {
  extends: Line,
  watchQuery: ['home'],
  async fetch ({store}) {
    await store.dispatch('perDay',{
      token: store.state.authUser.data.token,
      year: 2015,
    });
    this.loaded = true
  },
  data () {
    return {
      loaded: false,
      monday: this.$store.state.perDay.data[0].total,
      tuesday: this.$store.state.perDay.data[1].total,
      wednesday: this.$store.state.perDay.data[2].total,
      thursday: this.$store.state.perDay.data[3].total,
      friday: this.$store.state.perDay.data[4].total,
      saturday: this.$store.state.perDay.data[5].total,
      sunday: this.$store.state.perDay.data[6].total,
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 153, 255, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 153, 255, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 153, 255, 0)');

    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2.addColorStop(0, 'rgba(102, 255, 51, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(102, 255, 51, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(102, 255, 51, 0)');

    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient3.addColorStop(0, 'rgba(0, 153, 153, 0.9)')
    this.gradient3.addColorStop(0.5, 'rgba(0, 153, 153, 0.25)');
    this.gradient3.addColorStop(1, 'rgba(0, 153, 153, 0)');

    this.renderChart({
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: '2014',
          borderColor: 'rgba(255, 153, 255)',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient,
          data: [2813,2946,2987,2994,3105,2978,2830]
        },
        {
          label: 2015,
          borderColor: 'rgba(102, 255, 51)',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient2,
          data: [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday]
        },
        {
          label: 2016,
          borderColor: 'rgba(0, 153, 153)',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient3,
          data: [2467,2689,2743,2856,3001,3042,2499]
        },
      ]
    }, {responsive: true, maintainAspectRatio: false})
  },
  methods : {
    async GetPerMonth() {
      try {
        await this.$store.dispatch('perDay',{
          token: this.$store.state.authUser.data.token,
          year: 2015
        })
        this.loaded = true
      } catch (e) {
        this.formError = e.message
      }
    },
  }
}
</script>

<script>

import {Line} from 'vue-chartjs';

export default {
  extends: Line,
  watchQuery: ['home'],
  async fetch ({store}) {
    await store.dispatch('perMonth',{
      token: store.state.authUser.data.token,
      year: 2015,
    });
    this.loaded = true
  },
  data () {
    return {
      loaded: false,
      january: this.$store.state.perMonth.data[0].total,
      febuary: this.$store.state.perMonth.data[1].total,
      march: this.$store.state.perMonth.data[2].total,
      april: this.$store.state.perMonth.data[3].total,
      may: this.$store.state.perMonth.data[4].total,
      june: this.$store.state.perMonth.data[5].total,
      july: this.$store.state.perMonth.data[6].total,
      august: this.$store.state.perMonth.data[7].total,
      september: this.$store.state.perMonth.data[8].total,
      october: this.$store.state.perMonth.data[9].total,
      november: this.$store.state.perMonth.data[10].total,
      december: this.$store.state.perMonth.data[11].total,
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient3.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
    this.gradient3.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
    this.gradient3.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.renderChart({
      labels: ['May', 'June', 'July'],
      datasets: [
        {
          label: '2014',
          borderColor: 'rgba(255, 0,0)',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient,
          data: [5067,6400,7346]
        },
        {
          label: 2015,
          borderColor: '#05CBE1',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient2,
          data: [this.may, this.june, this.july]
        },
        {
          label: 2016,
          borderColor: 'white',
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: this.gradient3,
          data: [5402,6228,7912]
        },
      ]
    }, {responsive: true, maintainAspectRatio: false, animation: {duration: 2000}})
  },
  methods : {
    async GetPerMonth() {
      try {
        await this.$store.dispatch('perMonth',{
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

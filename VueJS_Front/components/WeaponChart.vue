<script>

import {Bar} from 'vue-chartjs';

export default {
  extends: Bar,
  watchQuery: ['home'],
  async fetch ({store}) {
    await store.dispatch('perWeapon',{
      token: store.state.authUser.data.token,
      year: 2015,
    });
    this.loaded = true
  },
  data () {
    return {
      loaded: false,
      knife: this.$store.state.perWeapon.data[1].total,
      firearm: this.$store.state.perWeapon.data[2].total,
      personal: this.$store.state.perWeapon.data[3].total,
      other: this.$store.state.perWeapon.data[4].total,
    }
  },
  mounted () {

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0.2, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.3)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0.2)');

    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2.addColorStop(0.2, 'rgba(0, 231, 255, 0.5)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.3)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0.2)');

    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient3.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)')
    this.gradient3.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    this.gradient3.addColorStop(1, 'rgba(255, 255, 255, 0.25)');


    this.renderChart({
      labels: ['Knife', 'Firearm', 'Personal Weapon', 'Other'],
      datasets: [
        {
          label: 2014,
          borderColor: [this.gradient],
          pointBackgroundColor: 'white',
          hoverBackgroundColor: ['rgba(255, 0,0, 0.5)','rgba(255, 0,0, 0.5)', 'rgba(255, 0,0, 0.5)', 'rgba(255, 0,0, 0.5)'],
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: [this.gradient, this.gradient, this.gradient, this.gradient],
          data: [122, 412, 264, 1745]
        },
        {
          label: 2015,
          borderColor: [this.gradient2],
          pointBackgroundColor: 'white',
          hoverBackgroundColor: ['rgba(0, 231, 255, 0.5)','rgba(0, 231, 255, 0.5)','rgba(0, 231, 255, 0.5)', 'rgba(0, 231, 255, 0.5)'],
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: [this.gradient2, this.gradient2, this.gradient2, this.gradient2],
          data: [this.knife, this.firearm, this.personal, this.other]
        },
        {
          label: 2016,
          borderColor: [this.gradient3],
          pointBackgroundColor: 'white',
          hoverBackgroundColor: ['rgba(255, 255, 255, 0.5)','rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.5)'],
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: [this.gradient3, this.gradient3, this.gradient3, this.gradient3],
          data: [99, 404, 212, 1678]
        },
      ]
    }, {responsive: true, maintainAspectRatio: false, animation: {duration: 2000}})
  },
  methods : {
    async GetPerWeapon() {
      try {
        await this.$store.dispatch('perWeapon',{
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

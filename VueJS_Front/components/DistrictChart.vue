<script>

import {Doughnut} from 'vue-chartjs';

export default {
  extends: Doughnut,
  watchQuery: ['home'],
  async fetch ({store}) {
    await store.dispatch('perDistrict',{
      token: store.state.authUser.data.token,
      year: 2015,
    });
    this.loaded = true
  },
  data () {
    return {
      loaded: false,
      c11: this.$store.state.perDistrict.data[0].total,
      e5: this.$store.state.perDistrict.data[1].total,
      a1: this.$store.state.perDistrict.data[2].total,
      d4: this.$store.state.perDistrict.data[3].total,
      b2: this.$store.state.perDistrict.data[4].total,
    }
  },
  mounted () {

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2.addColorStop(0, 'rgba(102, 255, 51, 0.4)')
    this.gradient2.addColorStop(0.5, 'rgba(102, 255, 51, 0.1)');
    this.gradient2.addColorStop(1, 'rgba(102, 255, 51, 0)');

    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient3.addColorStop(0, 'rgba(0, 231, 255, 0.5)')
    this.gradient3.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient3.addColorStop(1, 'rgba(0, 231, 255, 0)');

    this.gradient4 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient4.addColorStop(0, 'rgba(255, 153, 255, 0.5)')
    this.gradient4.addColorStop(0.5, 'rgba(255, 153, 255, 0.25)');
    this.gradient4.addColorStop(1, 'rgba(255, 153, 255, 0)');

    this.gradient5 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient5.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
    this.gradient5.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    this.gradient5.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.renderChart({
      labels: ['District C11', 'District E5', 'District A1', 'District D4', 'District B2'],
      datasets: [
        {
          borderColor: [this.gradient2, this.gradient,this.gradient3,this.gradient4,this.gradient5],
          pointBackgroundColor: 'white',
          pointBorderColor: 'white',
          borderWidth: 1,
          backgroundColor: [this.gradient2, this.gradient,this.gradient3,this.gradient4,this.gradient5],
          data: [this.c11, this.e5, this.a1, this.d4, this.b2]
        },
      ]
    }, {responsive: true, maintainAspectRatio: false})
  },
  methods : {
    async GetPerDistrict() {
      try {
        await this.$store.dispatch('perDistrict',{
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

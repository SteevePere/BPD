<template>
  <div>
    <Navbar/>
    <div class="container">
      <p> listes des inscriptions </p>
      <p>All pending : {{ $store.state.Pending.data }}</p>
      <div>
        <button
          type="button"
          name="button"
          @click="getAllPending">AllPending</button>
      </div>
      <button
        type="button"
        name="button"
        @click="getCSV">ExportCSV</button>
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
  },
  components: {
    Navbar
  },
  data () {
    return {
      role: this.$store.state.authUser.data.role,
      token: this.$store.state.authUser.data.token,
      formError : null
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
    async getCSV() {
      await this.$store.dispatch('GetCsv',{
        token: this.token
      })
    }
  }

}
</script>

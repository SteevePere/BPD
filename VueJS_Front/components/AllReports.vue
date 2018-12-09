<template lang="html">
  <div>
    <p>oui</p>
    <p>{{ $store.state.Repport }}</p>
  </div>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('GetAllreport');
  },
  data () {
    return {
      role: this.$store.state.authUser.data.role
    }
  },
  middleware : 'auth'
}
</script>

<style>
</style>

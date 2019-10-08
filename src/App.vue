<template>
  <div id="app">
    <Overview />
  </div>
</template>

<script>
import Overview from './components/Overview.vue'

export default {
  name: 'app',
  components: {Overview},
  created() {
    this.$store.dispatch('getRawData')
  },
}
</script>

<style>
</style>

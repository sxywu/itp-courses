<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('getRawData')
  },
}
</script>

<style>
</style>

<template>
  <svg id="overview">
  </svg>
</template>

<script>
export default {
  name: 'overview',
  mounted() {
    this.calculateData()
  },
  computed: {
    galaxies() {
      return this.$store.getters.galaxies
    }
  },
  watch: {
    galaxies() {
      this.calculateData()
    }
  },
  methods: {
    calculateData() {
    }
  }
}
</script>

<style>
</style>

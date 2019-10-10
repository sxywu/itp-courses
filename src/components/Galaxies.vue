<template>
  <div id="galaxies">
    <Galaxy v-for='galaxy in galaxies' v-bind='{galaxy}' />
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import Galaxy from './Galaxy.vue'

export default {
  name: 'app',
  components: {Galaxy},
  computed: {
    galaxies() {
      return this.$store.state.galaxies
    },
  }
}
</script>

<style scoped>
#galaxies {

}
</style>

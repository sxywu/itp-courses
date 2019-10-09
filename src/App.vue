<template>
  <div id="app">
    <Galaxy v-if='!selectedGalaxy' v-for='galaxy in galaxies' v-bind='{galaxy}' />
    <Detail v-if='selectedGalaxy' />

    <!-- HOVER -->
    <div v-if='hovered' class='hovered' :style='{
      top: `${hovered.y}px`,
      left: `${hovered.x + hovered.r + 20}px`,
      }'>
      {{ hovered.label }}
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import Galaxy from './components/Galaxy.vue'
import Detail from './components/Detail.vue'

export default {
  name: 'app',
  components: {Galaxy, Detail},
  data() {
    return {
      hovered: null,
    }
  },
  created() {
    this.$store.dispatch('getRawData')
  },
  computed: {
    galaxies() {
      return this.$store.getters.galaxies
    },
    selectedGalaxy() {
      return this.$store.state.galaxy
    },
  },
}
</script>

<style scoped>
.hovered {
  position: absolute;
  background: #fff;
  padding: 0px 5px;
  box-shadow: 0 0 5px #cfcfcf;
  font-size: 12px;
  pointer-events: none;
}
</style>

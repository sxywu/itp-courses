<template>
  <div id="app">
    <Galaxy v-for='galaxy in galaxies' v-bind='{galaxy, radiusScale}' />
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

export default {
  name: 'app',
  components: {Galaxy},
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
    nodes() {
      return _.chain(this.galaxies)
        .map(({classes, words}) => _.union(classes, words))
        .flatten().value()
    },
    radiusScale() {
      const domain = d3.extent(this.nodes, d => d.count)
      return d3.scaleSqrt().domain(domain).range([5, 15])
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

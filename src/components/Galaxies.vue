<template>
  <div id="galaxies">
    <div class='selectedGalaxy'>
      <Galaxy v-bind='{galaxy}' />
    </div>
    <div class='otherGalaxiesContainer'>
      <div class='otherGalaxies' :style='{
        width: `${(otherGalaxies.length) * 441}px`,
      }'>
        <Galaxy v-for='galaxy in otherGalaxies' v-bind='{galaxy}' />
      </div>
    </div>
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
    galaxy() {
      return this.$store.state.galaxy
    },
    otherGalaxies() {
      return _.without(this.galaxies, this.galaxy)
    },
  }
}
</script>

<style scoped>
#galaxies {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
}

.selectedGalaxy {
  width: 440px;
  display: inline-block;
  vertical-align: top;
}

.otherGalaxiesContainer {
  display: inline-block;
  width: calc(100% - 440px);
  height: 200px;
  margin-top: 6px;
  overflow-x: scroll;
  background-color: #f6f6f6;
  border-bottom: 1px solid;
}

</style>

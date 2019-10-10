<template>
  <div id="galaxies">
    <div class='scrollContainer'>
      <div ref='scroll' :style='{
        width: `${(galaxies.length) * 446 - 22}px`,
      }'>
        <div class='otherGalaxies'>
          <Galaxy v-for='galaxy in prevGalaxies' :key='galaxy.id' v-bind='{galaxy}' />
        </div>
        <div class='selectedGalaxy'>
          <Galaxy v-bind='{galaxy}' />
        </div>
        <div class='otherGalaxies'>
          <Galaxy v-for='galaxy in nextGalaxies' :key='galaxy.id' v-bind='{galaxy}' />
        </div>
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
    prevGalaxies() {
      const index = _.indexOf(this.galaxies, this.galaxy)
      return _.slice(this.galaxies, 0, index)
    },
    nextGalaxies() {
      const index = _.indexOf(this.galaxies, this.galaxy)
      return _.slice(this.galaxies, index + 1, this.galaxies.length)
    },
  },
}
</script>

<style scoped>
#galaxies {
  width: 100%;
  overflow: hidden;
  margin-top: 30px;
}

.scrollContainer {
  overflow: scroll;
}

.selectedGalaxy {
  width: 440px;
  display: inline-block;
  vertical-align: top;
  border-top: 1px solid;
  border-right: 1px solid;
  border-left: 1px solid;
}

.otherGalaxies {
  display: inline-block;
  margin-top: 11px;
  height: 200px;
  border-bottom: 1px solid;
  overflow: hidden;
}

</style>

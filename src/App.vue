<template>
  <div id="app">
    <div id='header'>
      <h1>Exploring Forty Years of ITP Classes</h1>
      data by Jim Schmitz // visualization by Shirley Wu
    </div>

    <Galaxies />
    <h2>{{ selectedGalaxy.title }}</h2>
    <Detail />
    <Descriptions />

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
import Galaxies from './components/Galaxies.vue'
import Detail from './components/Detail.vue'
import Descriptions from './components/Descriptions.vue'

export default {
  name: 'app',
  components: {Galaxies, Detail, Descriptions},
  data() {
    return {
      hovered: null,
    }
  },
  created() {
    this.$store.dispatch('getRawData')
  },
  computed: {
    selectedGalaxy() {
      return this.$store.state.galaxy
    },
  },
}
</script>

<style scoped>
#app {
  width: 1080px;
  height: 1920px;
  position: relative;
}

#header {
  padding-top: 20px;
  font-size: 20px;
  text-align: center;
}

#byline {
  text-align: center;
}

h2 {
  padding: 10px 20px;
}

.hovered {
  position: absolute;
  background: #fff;
  padding: 0px 5px;
  box-shadow: 0 0 5px #cfcfcf;
  font-size: 12px;
  pointer-events: none;
}
</style>

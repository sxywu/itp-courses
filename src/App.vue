<template>
  <div id="app">
    <div id='header'>
      <h1>Forty Years of ITP Classes</h1>
      <em>data by <span class='name'>Jim Schmitz</span> // visualizations by <span class='name'>Shirley Wu</span></em>
    </div>

    <Galaxies />
    <h2>{{ selectedGalaxy.title }}</h2>
    <Detail />
    <Descriptions />

    <Instructions />
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import Galaxies from './components/Galaxies.vue'
import Detail from './components/Detail.vue'
import Descriptions from './components/Descriptions.vue'
import Instructions from './components/Instructions.vue'

export default {
  name: 'app',
  components: {Galaxies, Detail, Descriptions, Instructions},
  data() {
    return {
      hovered: null,
    }
  },
  created() {
    this.$store.dispatch('getRawData')
  },
  mounted() {
    this.sinceLastActivity = 0

    document.addEventListener('mousemove', this.registerActivity)
    _.map(document.querySelectorAll('.scrollContainer'), el => {
      el.addEventListener('scroll', this.registerActivity)
    })

    this.$store.dispatch('startTimer')
  },
  computed: {
    selectedGalaxy() {
      return this.$store.state.galaxy || {}
    },
  },
  methods: {
    registerActivity() {
      this.$store.dispatch('resetActivity')
    },
  }
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
  pointer-events: none;
  user-select: none;
}

h2 {
  padding: 10px 20px;
  pointer-events: none;
  user-select: none;
}

.name {
  /* border-bottom: 1px solid; */
}
</style>

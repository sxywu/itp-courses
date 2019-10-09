<template>
  <div class='detail'>
    <svg :width='width' :height='height'>
      <!-- top half: timeline of classes -->
      <g v-for='d in planets' :transform='`translate(0, ${d.y})`'>
        <line :x1='d.x1' :x2='d.x2' stroke='#333' stroke-width='2' />
        <Planet v-bind='{d: d.planet}' />
        <text :x='d.x2 + 5'>{{ d.title }}</text>
        <text class='years' :x='d.x2 + 5' dy='1em'>
          {{ d.year1 }} - {{ d.year2 }}</text>
      </g>
      <!-- bottom half: line chart of words -->
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import Planet from './Planet.vue'
import Star from './Star.vue'

const margin = {top: 20, right: 160, bottom: 20, left: 40}
export default {
  name: 'detail',
  components: {Planet, Star},
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      planets: [],
    }
  },
  mounted() {
    this.xScale = d3.scaleLinear().range([margin.left, this.width - margin.right])

    this.calculateData()
  },
  computed: {
    galaxy() {
      return this.$store.state.galaxy
    },
    classes() {
      return this.$store.getters.classesForGalaxy
    },
    radiusScale() {
      return this.$store.getters.radiusScale
    },
  },
  watch: {
    classes() {
      this.calculateData()
    },
  },
  methods: {
    calculateData() {
      // years
      const xDomain = d3.extent(_.flatten(this.classes), d => d.year)
      this.xScale.domain(xDomain)

      let y = margin.top
      this.planets = _.chain(this.classes)
        .sortBy(classes => d3.min(classes, d => d.year))
        .map((classes, i) => {
          const [min, max] = d3.extent(classes, d => d.year)
          const x = this.xScale(min)
          const count = _.sumBy(classes, d => d.words.length)
          const r = this.radiusScale(count)
          const height = Math.max(2 * r + 10, 30)
          y += height

          return {
            planet: {
              x, y: 0, r,
              rotate: _.random(-30, 30),
              ring: i < (this.classes.length / 4),
            },
            y: y - height / 2,
            year1: min, year2: max,
            x1: x, x2: this.xScale(max),
            title: _.maxBy(classes, 'year').title,
          }
        }).value()
    },
  }
}
</script>

<style scoped>
text {
  font-size: 12px;
}
.years {
  font-style: italic;
}
</style>

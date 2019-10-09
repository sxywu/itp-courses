<template>
  <div class='detail'>
    <svg :width='width' :height='height'>
      <!-- top half: timeline of classes -->
      <g v-for='d in planets' :transform='`translate(0, ${d.y})`'>
        <circle :cx='d.x2' r='2' fill='#333' />
        <line :x1='d.x1' :x2='d.x2' stroke='#333' stroke-width='2' />
        <Planet v-bind='{d: d.planet}' />
        <g :transform='`translate(${d.x2 + 10}, 0)`'>
          <text>{{ d.title }}</text>
          <text class='years' dy='1em'>{{ d.year1 }}
            <tspan v-if='d.year1 !== d.year2'> - {{ d.year2 }}</tspan></text>
        </g>
      </g>
      <!-- axis -->
      <g ref='xAxis' :transform='`translate(0, ${axisY})`' />
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
      axisY: 0,
    }
  },
  mounted() {
    this.xScale = d3.scaleLinear().range([margin.left, this.width - margin.right])
    this.xAxis = d3.axisBottom().tickFormat(d => d).tickSizeOuter(0)

    this.calculateData()
    this.renderAxis()
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
      this.renderAxis()
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
          const height = Math.max(2 * r + 10, 32)
          y += height

          return {
            planet: {
              x, y: 0, r,
              rotate: _.random(-30, 30),
            },
            x1: x, x2: this.xScale(max),
            y: y - height / 2,
            year1: min, year2: max,
            title: _.maxBy(classes, 'year').title,
            count,
          }
        }).sortBy(({count}) => -count)
        .map((d, i) => Object.assign(d, {
          planet: Object.assign(d.planet, {ring: i < (this.classes.length / 4)})
        })).value()

        this.axisY = y += margin.bottom
    },
    renderAxis() {
      this.xAxis.scale(this.xScale)
      d3.select(this.$refs.xAxis).call(this.xAxis)
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

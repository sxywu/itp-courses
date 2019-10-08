<template>
  <div id="overview">
    <svg v-for='{planets, stars} in groups' :width='width' :height='height'>
      <circle v-for='d in planets' fill='#fff' stroke='#333'
        :cx='d.x' :cy='d.y' :r='d.r' />
      <text v-for='d in stars' :x='d.x' :y='d.y' :style='{fontSize: `${5 * d.r}px`}'
        text-anchor='middle' dy='.35em' fill='#333'>*</text>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

const width = 400 // 40 years
const height = 200 // 50 ranks
const margin = {top: 20, right: 20, bottom: 20, left: 20}
export default {
  name: 'overview',
  data() {
    return {
      groups: [],
      width, height,
    }
  },
  mounted() {
    this.simulation = d3.forceSimulation()
      .force('x', d3.forceX(d => d.forceX))
      .force('y', d3.forceY(d => d.forceY))
      .force('collide', d3.forceCollide(d => d.radius * 1.5))
      .stop()
    this.xScale = d3.scaleLinear().range([margin.left, width - margin.right])
    this.yScale = d3.scaleLinear().range([margin.top, height - margin.bottom])

    this.calculateData()
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
  watch: {
    galaxies() {
      this.calculateData()
    }
  },
  methods: {
    calculateData() {
      this.groups = _.map(this.galaxies, ({words, classes, links}) => {
        // scales
        const xDomain = d3.extent(_.union(words, classes), d => d.medianYear)
        const yDomain = d3.extent(words, d => d.medianRank)
        this.xScale.domain(xDomain)
        this.yScale.domain(yDomain)

        // position everything
        const ranks = _.chain(words).map('ranks').flatten().sortBy().value()
        const medianY = this.yScale(d3.median(ranks))

        const planets = _.chain(classes)
          .sortBy(d => -d.count)
          .map(({medianYear, count}) => {
            return {
              x: this.xScale(medianYear),
              y: medianY,
              r: this.radiusScale(10 * count),
            }
          }).value()

        const stars = _.chain(words)
          .sortBy(d => -d.count)
          .map(({medianRank, medianYear, count}) => {
            return {
              x: this.xScale(medianYear),
              y: this.yScale(medianRank),
              r: this.radiusScale(count),
            }
          }).value()

        return {planets, stars}
      })
    }
  }
}
</script>

<style>
svg {
  overflow: visible;
}
</style>

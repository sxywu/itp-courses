<template>
  <div id="overview">
    <div class='galaxy' v-for='{planets, stars, lines, title} in groups'>
      <svg :width='width' :height='height'>
        <!-- <line v-for='d in lines' :x1='d.source.x' :y1='d.source.y'
          :x2='d.target.x' :y2='d.target.y' stroke='#999' /> -->
        <circle v-for='d in planets' :cx='d.x' :cy='d.y' :r='d.r'
          fill='#fff' stroke='#333' stroke-width='2' />
        <text v-for='d in stars' :x='d.x' :y='d.y' :style='{fontSize: `${5 * d.r}px`}'
          text-anchor='middle' dy='.35em' fill='#333'>*</text>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

const width = 400 // 40 years
const height = 200 // 50 ranks
const margin = {top: 40, right: 40, bottom: 40, left: 40}
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
      .force('collide', d3.forceCollide(d => d.r + 5))
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
      return d3.scaleSqrt().domain(domain).range([3, 10])
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
          .map(({medianYear, count, id}) => {
            const x = this.xScale(medianYear)
            const y = medianY
            return {
              id, x, y, forceX: x, forceY: y,
              r: this.radiusScale(5 * count),
            }
          }).value()

        const stars = _.chain(words)
          .sortBy(d => -d.count)
          .map(({medianRank, medianYear, count, id}) => {
            const x = this.xScale(medianYear)
            const y = this.yScale(medianRank)
            return {
              id, x, y, forceX: x, forceY: y,
              r: this.radiusScale(count),
            }
          }).value()

        this.simulation.nodes(_.union(planets, stars)).alpha(1)
        _.times(300, i => this.simulation.tick())

        return {planets, stars}
      })
    }
  }
}
</script>

<style>
.galaxy {
  display: inline-block;
}

svg {
  overflow: visible;
  margin: 10px;
  border: 1px solid;
}
</style>

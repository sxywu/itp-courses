<template>
  <div class='galaxy' @click='$store.commit(`setGalaxy`, galaxy)'>
    <svg :width='width' :height='height'>
      <Planet v-for='d in planets' v-bind='{d}' />
      <Star v-for='d in stars' v-bind='{d}' />
    </svg>
    <div class='title'>{{ title }}</div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

import Planet from './Planet.vue'
import Star from './Star.vue'

const width = 400 // 40 years
const height = 200 // 50 ranks
const margin = {top: 40, right: 40, bottom: 40, left: 40}
export default {
  name: 'overview',
  props: ['galaxy'],
  components: {Planet, Star},
  data() {
    return {
      planets: [], stars: [],
      title: '',
      width, height,
    }
  },
  mounted() {
    this.simulation = d3.forceSimulation()
      .force('x', d3.forceX(d => d.forceX))
      .force('y', d3.forceY(d => d.forceY))
      .force('collide', d3.forceCollide(d => d.r + 10))
      .stop()
    this.xScale = d3.scaleLinear().range([margin.left, width - margin.right])
    this.yScale = d3.scaleLinear().range([margin.top, height - margin.bottom])

    this.calculateData()
  },
  computed: {
    radiusScale() {
      return this.$store.getters.radiusScale
    },
  },
  watch: {
    galaxy() {
      this.calculateData()
    }
  },
  methods: {
    calculateData() {
      const {words, classes, links, title} = this.galaxy
      // scales
      const xDomain = d3.extent(_.union(words, classes), d => d.medianYear)
      const yDomain = d3.extent(words, d => d.medianRank)
      this.xScale.domain(xDomain)
      this.yScale.domain(yDomain)

      // position everything
      const ranks = _.chain(words).map('ranks').flatten().sortBy().value()
      const medianY = this.yScale(d3.median(ranks))

      this.planets = _.chain(classes)
        .sortBy(d => -d.count)
        .map(({medianYear, count, id, title}, i) => {
          const x = this.xScale(medianYear)
          const y = medianY
          return {
            id, x, y, forceX: x, forceY: y,
            r: this.radiusScale(5 * count),
            rotate: _.random(-30, 30),
            ring: i < (classes.length / 4),
          }
        }).value()

      this.stars = _.chain(words)
        .sortBy(d => -d.count)
        .map(({medianRank, medianYear, count, id, type}) => {
          const x = this.xScale(medianYear)
          const y = this.yScale(medianRank)
          return {
            id, x, y, forceX: x, forceY: y,
            r: this.radiusScale(count) / (type === 'thing' ? 3 : 1),
            rotate: _.random(180),
            type,
          }
        }).value()

      this.simulation.nodes(_.union(this.planets, this.stars)).alpha(1)
      _.times(300, i => this.simulation.tick())
    },
  }
}
</script>

<style>
.galaxy {
  display: inline-block;
  position: relative;
  margin: 10px;
  border-bottom: 1px solid;
  cursor: pointer;
}

svg {
  overflow: visible;
}

.title {
  width: 400px;
  padding-bottom: 10px;
  text-align: right;
  font-weight: bold;
}
</style>

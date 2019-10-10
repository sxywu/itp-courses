<template>
  <div class='detail'>
    <svg :width='width' :height='height'>
      <!-- selected year -->
      <rect :x='rect.x - rect.width / 2' :width='rect.width' :height='rect.height'
        fill='#f0f0f0' />
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
      <g v-for='d in stars' :transform='`translate(0, ${d.y})`'>
        <path :d='d.path' fill='none' stroke='#999' stroke-dasharray='5' />
        <Star v-for='d in d.stars' v-bind='{d}' />
        <text :x='d.x2 + 10' :y='d.y2' dy='.35em'>{{ d.word }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import Planet from './Planet.vue'
import Star from './Star.vue'

const margin = {top: 20, right: 160, bottom: 20, left: 40}
const wordHeight = 48
export default {
  name: 'detail',
  components: {Planet, Star},
  data() {
    return {
      height: 1466, // 1920 - 334
      planets: [],
      stars: [],
      rect: {}, // for drawing year
      axisY: 0,
    }
  },
  mounted() {
    this.xScale = d3.scaleLinear().range([margin.left, this.width - margin.right])
    this.yScale = d3.scaleLinear().range([wordHeight * 0.2, wordHeight * 0.8])
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
    words() {
      return this.$store.getters.wordsForGalaxy
    },
    radiusScale() {
      return this.$store.getters.radiusScale
    },
    width() {
      return this.$store.state.width
    },
    year() {
      return this.$store.state.year
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
      const nodes = _.union(_.flatten(this.words), _.flatten(this.classes))
      const xDomain = d3.extent(nodes, d => d.year)
      this.xScale.domain(xDomain).nice()

      let y = margin.top
      this.planets = _.chain(this.classes)
        .sortBy(classes => d3.min(classes, d => d.year))
        .map((classes, i) => {
          const [min, max] = d3.extent(classes, d => d.year)
          const x = this.xScale(min)
          const r = this.radiusScale(classes.length)
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
            count: classes.length,
          }
        }).sortBy(({count}) => -count)
        .map((d, i) => Object.assign(d, {
          planet: Object.assign(d.planet, {ring: i < (this.classes.length / 4)})
        })).value()

      this.axisY = y += margin.bottom
      y += 2 * margin.top

      this.stars = _.chain(this.words)
        .sortBy(word => word[0].year)
        .map((word, i) => {
          const yDomain = d3.extent(word, d => d.rank)
          this.yScale.domain(yDomain)

          let path = ''
          const stars = _.chain(word)
            .sortBy(d => d.year)
            .map((d, i) => {
              const x = this.xScale(d.year)
              const y = this.yScale(d.rank)
              // line to connect
              const command = i === 0 ? 'M' : 'L'
              path += `${command} ${x},${y}`

              return {
                x, y, type: d.type,
                r: this.radiusScale(word.length) / (d.type === 'thing' ? 4 : 2),
                rotate: _.random(180),
              }
            }).value()
          return {
            stars, path,
            y: y + i * wordHeight,
            x2: _.last(stars).x, y2: _.last(stars).y, // for text
            word: word[0].word,
          }
        }).value()

      this.rect = {
        x: this.xScale(this.year),
        width: this.xScale(this.year) - this.xScale(this.year - 1),
        height: y + this.stars.length * wordHeight,
      }
    },
    renderAxis() {
      this.xAxis.scale(this.xScale)
      d3.select(this.$refs.xAxis).call(this.xAxis)
    },
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  width: 100%;
  overflow: hidden;
}

text {
  font-size: 12px;
}
.years {
  font-style: italic;
}
</style>

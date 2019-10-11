<template>
  <div id='detail'>
    <svg class='years' :width='width' :height='docHeight'>
      <!-- selected year -->
      <rect v-for='d in rects' :x='d.x' :width='d.width' :height='d.height'
        fill='#f0f0f0' :opacity='d.opacity' @click='$store.commit(`setYear`, d.year)' />
    </svg>
    <svg class='classes' :width='width' :height='classesHeight'>
      <!-- top half: timeline of classes -->
      <g v-for='d in planets' :transform='`translate(0, ${d.y})`'>
        <circle :cx='d.x1' r='2' />
        <line :x1='d.x2' :x2='d.x2' y1='-3.5' y2='3.5' stroke='#333' />
        <line :x1='d.x1' :x2='d.x2' stroke='#333' stroke-width='2' />
        <Planet v-bind='{d: d.planet}' />
        <g :transform='`translate(${d.x2 + 6}, 0)`'>
          <text :dy='`${d.text.titleY}em`'>{{ d.text.title }}</text>
          <text class='years' :opacity='d.text.yearOpacity' dy='1em'>{{ d.text.year1 }}
            <tspan v-if='d.text.year1 !== d.text.year2'> - {{ d.text.year2 }}</tspan>
          </text>
        </g>
      </g>
      <!-- axis -->
      <g ref='xAxis' :transform='`translate(0, ${axisY})`' />
    </svg>
    <div ref='scrollContainer' class='scrollContainer' :style='{
      height: `${height}px`,
    }'>
      <svg class='words' :width='width' :height='wordsHeight'>
        <!-- bottom half: line chart of words -->
        <g v-for='d in stars' :transform='`translate(0, ${d.y})`'>
          <path :d='d.path' fill='none' stroke='#999' stroke-dasharray='5' />
          <Star v-for='d in d.stars' v-bind='{d}' />
          <text :x='d.x2 + 10' :y='d.y2' dy='.35em'>{{ d.word }}</text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import {TimelineLite} from 'gsap'
import Planet from './Planet.vue'
import Star from './Star.vue'

const margin = {top: 20, right: 200, bottom: 20, left: 40}
const wordHeight = 48
const docHeight = 1466
const descHeight = 420
const collapsedClassesHeight = 14

export default {
  name: 'detail',
  components: {Planet, Star},
  data() {
    return {
      docHeight,
      height: docHeight, // 1920 - 334
      planets: [],
      stars: [],
      rects: {}, // for drawing each year
      axisY: 0,
      classesHeight: 0, // for animation
      wordsHeight: 0,
    }
  },
  mounted() {
    this.xScale = d3.scaleLinear().domain([1980, 2020])
      .range([margin.left, this.width - margin.right])
    this.yScale = d3.scaleLinear().range([wordHeight * 0.2, wordHeight * 0.8])
    this.xAxis = d3.axisBottom().tickFormat(d => d).tickSizeOuter(0)

    this.$refs.scrollContainer.addEventListener('scroll', this.handleScroll)
    this.tl = new TimelineLite({paused: true})

    this.calculateData()
    this.calculateRects()
    this.renderAxis()
    this.calculateScroll()
  },
  destroyed() {
    this.$refs.scrollContainer.removeEventListener('scroll', this.handleScroll)
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
    years() {
      return this.$store.state.years
    },
    year() {
      return this.$store.state.year
    },
  },
  watch: {
    galaxy() {
      this.calculateData()
      this.calculateRects()
      this.calculateScroll()
    },
    year() {
      this.calculateRects()
    },
  },
  methods: {
    calculateData() {
      if (!this.galaxy) return

      let y = margin.top
      this.planets = _.chain(this.classes)
        .sortBy(classes => d3.min(classes, d => d.year))
        .map((classes, i) => {
          const min = d3.min(classes, d => d.year)
          const max = d3.max(classes, d => this.years[_.indexOf(this.years, d.year) + 1])
          const x = this.xScale(min)
          const r = this.radiusScale(classes.length)
          const height = Math.max(2 * r + 10, 28)
          y += height

          return {
            planet: {
              x, y: 0, r,
            },
            x1: x, x2: this.xScale(max),
            y: y - height / 2,
            text: {
              year1: min, year2: max,
              title: _.maxBy(classes, 'year').title,
              yearOpacity: 1,
              titleY: 0,
            },
            count: classes.length,
          }
        }).sortBy(({count}) => -count)
        .map((d, i) => Object.assign(d, {
          planet: Object.assign(d.planet, {
            ring: i < (this.classes.length / 4),
            rotate: (i % 2 ? -1 : 1) * _.random(30),
          })
        })).sortBy(({y}) => y).value()

      this.axisY = y += margin.bottom / 2
      this.classesHeight = y + margin.bottom

      y = margin.top
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

          y += wordHeight
          return {
            stars, path,
            y: y - wordHeight,
            x2: _.last(stars).x, y2: _.last(stars).y, // for text
            word: word[0].word,
          }
        }).value()

      this.wordsHeight = y + descHeight
      this.height = docHeight - this.classesHeight
    },
    calculateRects() {
      if (!this.galaxy) return

      this.rects = _.chain(this.galaxy.years)
        .map(year => {
          const next = this.years[_.indexOf(this.years, year) + 1]
          if (!next) return
          const x = this.xScale(year)

          return {
            x, width: this.xScale(next) - x,
            height: docHeight,
            opacity: +(this.year === year),
            year,
          }
        }).dropRight().value()
    },
    renderAxis() {
      this.xAxis.scale(this.xScale)
      d3.select(this.$refs.xAxis).call(this.xAxis)
        .selectAll('text').style('user-select', 'none')
    },
    handleScroll() {
      const scrollTop = this.$refs.scrollContainer.scrollTop

      if (scrollTop > this.height) return
      const progress = scrollTop / this.height
      this.tl.progress(progress)
    },
    calculateScroll() {
      this.tl.clear()

      // first, animate the courses radius
      this.tl.staggerTo(_.map(this.planets, 'planet'), 0.1, {
        r: 0,
      }, 0, 0)

      this.tl.staggerTo(this.planets, 0.2, {
        cycle: {y: i => i * collapsedClassesHeight + margin.top},
      }, 0, 0)
      const classesHeight = this.planets.length * collapsedClassesHeight + margin.top + margin.bottom
      this.tl.to(this.$data, 0.2, {
        height: docHeight - classesHeight,
        classesHeight,
        axisY: classesHeight - margin.bottom,
      }, 0)

      // fade years text
      this.tl.staggerTo(_.map(this.planets, 'text'), 0.1, {
        yearOpacity: 0,
      }, 0, 0)
      this.tl.staggerTo(_.map(this.planets, 'text'), 0.2, {
        titleY: 0.35,
      }, 0, 0)

      // adjust year rect height
      this.tl.to(this.rects, 1, {
        height: docHeight - descHeight,
      }, 0)
    },
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  width: 100%;
  height: 1466px;
  overflow: hidden;
}

.scrollContainer {
  overflow: scroll;
}

svg.years {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

text {
  user-select: none;
  font-size: 10px;
}

text.years {
  font-style: italic;
}
</style>

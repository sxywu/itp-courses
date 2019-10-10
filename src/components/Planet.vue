<template>
  <!-- PLANETS -->
  <g class='planet' :transform='`translate(${d.x}, ${d.y})scale(${d.r})rotate(${d.rotate})`'>
    <path :d='circlePath()' fill='#fff' stroke='#333' :stroke-width='0.75 / d.r' />
    <!-- planet's ring -->
    <path v-if='d.ring' d='M1,0 A1.25,0.25 0 1 1 -1,0'
      fill='none' stroke='#333' :stroke-width='2 / d.r' />
  </g>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import p5 from 'p5'

export default {
  name: 'planet',
  props: ['d'],
  methods: {
    circlePath() {
      let path = ''
      _.times(11, i => {
        const angle = i * (Math.PI / 5)
        const x = p5.prototype.randomGaussian(Math.cos(angle), 0.03)
        const y = p5.prototype.randomGaussian(Math.sin(angle), 0.03)

        if (i === 0) {
          path += `M${x},${y}`
        } else {
          path += `A 1,1 0 1 0 ${x},${y}`
        }
      })

      return `${path}`
    },
  }
}
</script>

<style scoped>
.planet {
  pointer-events: none;
}
</style>

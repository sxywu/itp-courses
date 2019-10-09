<template>
  <!-- PLANETS -->
  <path :d='d.type === `tech` ? starPath() :
      (d.type === `person` ? asteriskPath() : circlePath())'
    :fill='d.type === `thing` ? `#333` : `#fff`'stroke='#333' :stroke-width='1.5 / d.r'
    :transform='`translate(${d.x}, ${d.y})scale(${d.r})rotate(${d.rotate})`' />
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import p5 from 'p5'

export default {
  name: 'star',
  props: ['d'],
  methods: {
    starPath() {
      const outerRadius = 1
      const innerRadius = 0.5
      let path = ''
      _.times(30, i => {
        const radius = i % 2 ? outerRadius : innerRadius
        const angle = i * (Math.PI / 5)
        const command = i === 0 ? 'M' : 'L'
        const x = p5.prototype.randomGaussian(radius * Math.cos(angle), 0.05)
        const y = p5.prototype.randomGaussian(radius * Math.sin(angle), 0.05)

        path += `${command} ${x},${y}`
      })
      return `${path}Z`
    },
    asteriskPath() {
      let path = ''
      _.times(12, i => {
        let angle = p5.prototype.randomGaussian(i * (Math.PI / 4), 0.1)
        path += `
          M${_.round(Math.cos(angle), 2)},${_.round(Math.sin(angle), 2)}
          L${_.round(Math.cos(angle + Math.PI), 2)},${_.round(Math.sin(angle + Math.PI), 2)}`
      })

      return path
    },
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
</style>

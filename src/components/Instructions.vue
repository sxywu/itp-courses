<template>
  <div id="instructions" :style='{display}'
    @click='$store.commit("setDisplayInstructions", "none")'>
    <img v-for='d in images' :src='d.src' :style='{
      height: "100vh", opacity: d.opacity
    }' />
  </div>
</template>

<script>
import * as d3 from 'd3'
import {TimelineLite, TweenLite} from 'gsap'

const numInstructions = 4

export default {
  name: 'instructions',
  data() {
    return {
      images: _.times(numInstructions, i => {
        return {
          src: require(`../assets/instructions${i + 1}.png`),
          opacity: 0,
        }
      }),
    }
  },
  computed: {
    display() {
      return this.$store.state.displayInstructions
    },
    galaxies() {
      return this.$store.state.galaxies
    },
  },
  watch: {
    display() {
      if (this.display === 'block') {
        this.tl.restart()
      } else if (this.display === 'none') {
        this.tl.stop()
      }
    }
  },
  mounted() {
    const duration = 5
    const animationDuration = 2

    // create timeline
    this.tl = new TimelineLite({paused: true})

    // loop through each image and turn it on and then off
    _.each(this.images, (d, i) => {
      // first fade opacity in
      this.tl.to(d, animationDuration, {opacity: 1}, i * duration)
      // then fade it out if it's not the last one
      this.tl.to(d, animationDuration, {opacity: 0}, (i + 1) * duration)
    })

    // update galaxy part way during the first instruction
    _.each([2, 1, 0], (d, i) => {
      this.tl.add(() => {
        this.$store.commit('setGalaxy', this.galaxies[d])
      }, (0.4 + i * 0.2) * duration)
    })

    // update year part way through third instruction
    _.each([1992, 2011, 2000], (year, i) => {
      this.tl.add(() => {
        this.$store.commit('setYear', year)
      }, (2.4 + i * 0.2) * duration)
    })

    // at the end, disable instructions
    this.tl.add(() => {
      this.$store.commit('setDisplayInstructions', 'none')
    })
  },
}
</script>

<style scoped>
#instructions {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

img {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<template>
  <div id="descriptions">
    <div class='scrollContainer'>
      <div ref='scroll' :style='{
        width: `${(descriptions.length) * (width + 32)}px`,
      }'>
        <div class='description' v-for='d in descriptions' :style='{
          width: `${width}px`,
        }'>
          <h3>{{ d.title }}</h3>
          <div class='byline'>taught by {{ d.instructor.join(', ') }} in {{ d.year }}</div>
          <p>
            <span v-for='({phrase, highlight}) in d.description' :class='highlight ? `word`: ``'>
              {{ phrase }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

export default {
  name: 'descriptions',
  data() {
    return {
      width: 300,
    }
  },
  computed: {
    descriptions() {
      return _.map(this.$store.getters.descriptions, ({title, instructor, year, description, words}) => {
        words = _.map(words, 'word')
        description = _.reduce(words, (desc, word) => {
          return desc.split(word).join(`<split>${word}<split>`)
        }, description)
        description = _.map(description.split('<split>'), phrase => {
          return {
            phrase,
            highlight: _.includes(words, phrase),
          }
        })

        return {
          title, instructor, year,
          description,
        }
      })
    }
  },
}
</script>

<style scoped>
#descriptions {
  position: absolute;
  width: calc(100% - 40px);
  height: 400px;
  left: 20px;
  bottom: 30px;
  pointer-events: none;
}

.scrollContainer {
  overflow-x: scroll;
}

.description {
  display: inline-block;
  height: 380px;
  overflow-y: scroll;
  padding: 10px;
  margin-right: 10px;
  background: #fff;
  border: 1px solid;
  user-select: none;
  pointer-events: auto;
}

.byline {
  font-style: italic;
}

.word {
  display: inline-block;
  background: #333;
  color: #fff;
  padding: 0 3px;
  margin: 1px 0;
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import * as d3 from 'd3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    width: 1080,
    height: 1920,
    classes: [],
    words: [],
    galaxies: [],
    galaxy: null, // selected galaxy
  },
  getters: {
    nodes({galaxies}) {
      if (!galaxies.length) return
      return _.chain(galaxies)
        .map(({classes, words}) => _.union(classes, words))
        .flatten().value()
    },
    radiusScale(state, {nodes}) {
      const domain = d3.extent(nodes, d => d.count)
      return d3.scaleSqrt().domain(domain).range([8, 20])
    },
    // for getting the raw data version
    classesForGalaxy({galaxy, classes}) {
      if (!galaxy) return
      const classesByCourse = _.groupBy(classes, 'course')
      return _.map(galaxy.classes, ({id}) => classesByCourse[id])
    },
    wordsForGalaxy({galaxy, words}) {
      if (!galaxy) return
      const wordsByKey = _.groupBy(words, 'word')
      return _.map(galaxy.words, ({id}) => wordsByKey[id])
    }
  },
  mutations: {
    setClasses(state, classes) {
      state.classes = classes
    },
    setWords(state, words) {
      state.words = words
    },
    setGalaxies(state, galaxies) {
      state.galaxies = galaxies
    },
    setGalaxy(state, galaxy) {
      state.galaxy = galaxy
    },
  },
  actions: {
    getRawData: function({ commit }) {
      Promise.all([
        d3.json('./classes.json'),
        d3.json('./words.json'),
      ]).then(([classes, words], id) => {
        // link them to each other
        const classesById = _.keyBy(classes, 'id')
        const wordsById = _.keyBy(words, 'id')
        _.each(classes, d => Object.assign(d, {
          words: _.map(d.words, (id) => wordsById[id] || id)
        }))
        _.each(words, d => Object.assign(d, {
          courses: _.map(d.courses, id => classesById[id])
        }))

        // calculate galaxies from the two datasets
        // NOTE: had to filter out classes that only happened once, and those with no keywords
        const galaxies = _.chain(classes)
          .filter(d => d.words.length)
          .groupBy('group')
          .map((classes, id) => {
            // get all the words from all the classes and aggregate
            const words = _.chain(classes)
              .map('words').flatten().filter()
              .groupBy('word')
              .filter(words => words.length > 1)
              // .filter(words => _.chain(words).map('courses').flatten().map('course').uniq().value().length > 1)
              .map(words => {
                const ranks = _.chain(words).map('rank').sortBy().value()
                const years = _.chain(words).map('year').sortBy().value()
                return {
                  id: words[0].word, count: words.length,
                  type: words[0].type, ranks, years,
                  medianRank: d3.median(ranks), medianYear: d3.median(years),
                  group: id,
                }
              }).value()
            // now make nodes for each class (grouped by ID)
            classes = _.chain(classes)
              .groupBy('course')
              .filter(classes => classes.length > 1)
              .map(classes => {
                classes = _.sortBy(classes, 'year')
                return {
                  id: classes[0].course,
                  count: classes.length,
                  medianYear: d3.median(classes, d => d.year),
                  title: _.last(classes).title,
                  group: id,
                }
              }).value()

            return {classes, words, id}
          }).filter(d => d.classes.length && d.words.length)
          .sortBy(d => -d.classes.length - d.words.length)
          .value()

        commit('setClasses', classes)
        commit('setWords', words)
        commit('setGalaxies', galaxies)
        commit('setGalaxy', galaxies[0])
      })
    },
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import * as d3 from 'd3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classes: [],
    words: [],
    galaxy: null, // selected galaxy
  },
  getters: {
    galaxies({words}) {
      if (!words.length) return

      const galaxies = {}
      const classes = {}
      const links = {}
      words = _.chain(words)
        .groupBy(d => d.word)
        // only want words connected to two or more classes
        .filter(words => _.chain(words).map('courses').flatten().map('course').uniq().value().length > 1)
        .map(words => {
          let ranks = _.chain(words).map('rank').sortBy().value()
          let years = _.chain(words).map('year').sortBy().value()
          const source = {
            id: words[0].word, count: words.length,
            type: words[0].type, ranks, years,
            medianRank: d3.median(ranks), medianYear: d3.median(years),
          }

          _.chain(words).map('courses').flatten()
            .sortBy(d => -d.year)
            .each(({course, year, title, group}) => {
              // for each course, create it if it doesn't yet exist
              if (!classes[course]) {
                classes[course] = {
                  id: course, title,
                  count: 0,
                  years: [],
                  medianYear: year,
                  group,
                }
              }

              const target = classes[course]
              target.count += 1
              target.years.push(year)
              target.medianYear = d3.median(_.sortBy(target.years))

              // take care of galaxies
              if (!galaxies[group]) {
                galaxies[group] = {
                  id: group,
                  words: [],
                  classes: [],
                }
              }
              galaxies[group].words.push(source)
              galaxies[group].classes.push(target)
          }).value()
          return source
        }).value()

      return _.map(galaxies, d => Object.assign(d, {
        words: _.uniqBy(d.words, 'id'),
        classes: _.uniqBy(d.classes, 'id'),
      }))
    },
    nodes(state, {galaxies}) {
      return _.chain(galaxies)
        .map(({classes, words}) => _.union(classes, words))
        .flatten().value()
    },
    radiusScale(state, {nodes}) {
      const domain = d3.extent(nodes, d => d.count)
      return d3.scaleSqrt().domain(domain).range([5, 15])
    },
    // for getting the raw data version
    classesForGalaxy({galaxy, classes}) {
      const classesByCourse = _.groupBy(classes, 'course')
      return _.map(galaxy.classes, ({id}) => classesByCourse[id])
    },
    wordsForGalaxy({galaxy, words}) {
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
    setGalaxy(state, galaxy) {
      state.galaxy = galaxy
    },
  },
  actions: {
    getRawData: function({ commit }) {
      Promise.all([
        d3.json('./classes.json'),
        d3.json('./words.json'),
      ]).then(([classes, words]) => {
        // link them to each other
        const classesById = _.keyBy(classes, 'id')
        const wordsById = _.keyBy(words, 'id')
        _.each(classes, d => Object.assign(d, {
          words: _.map(d.words, (id) => wordsById[id] || id)
        }))
        _.each(words, d => Object.assign(d, {
          courses: _.map(d.courses, id => classesById[id])
        }))

        commit('setClasses', classes)
        commit('setWords', words)
      })
    },
  }
})

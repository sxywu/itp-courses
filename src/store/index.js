import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import * as d3 from 'd3'

Vue.use(Vuex)

let sinceLastActivity = 0

export default new Vuex.Store({
  state: {
    width: 1080,
    height: 1920,
    classes: [],
    words: [],
    galaxies: [],
    galaxy: null, // selected galaxy
    years: [],
    year: 1980,
    twinkle: false, // for ANIMATION
    displayInstructions: 'none',
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
      return d3.scaleSqrt().domain(domain).range([5, 20])
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
    },
    descriptions({galaxy, classes, year}) {
      if (!galaxy) return
      // get every class in the galaxy that has a description in that year
      return _.chain(galaxy.classes)
        .map(({id}) => _.find(classes, d => d.course === id && d.year === year))
        .filter().value()
    },
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
      state.year = galaxy.years[0]
    },
    setYears(state, years) {
      state.years = years
    },
    setYear(state, year) {
      state.year = year
    },
    toggleTwinkle(state) {
      state.twinkle = !state.twinkle
    },
    setDisplayInstructions(state, display) {
      if (state.displayInstructions === display) return
      state.displayInstructions = display
      sinceLastActivity = 0
    }
  },
  actions: {
    getRawData: function({ commit }) {
      Promise.all([
        d3.json('./classes.json'),
        d3.json('./words.json'),
        d3.csv('./groups.csv'),
      ]).then(([classes, words, groups], id) => {
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
        const classesByCourse = _.groupBy(classes, 'course')
        const groupsById = _.keyBy(groups, 'id')
        const galaxies = _.chain(classes)
          .filter(d => d.words.length)
          .groupBy('group')
          .map((classes, id) => {
            classes = _.chain(classes).map(({course}) => classesByCourse[course])
              .flatten().uniqBy('id').value()
            const years = _.chain(classes).map('year').flatten().uniq().sortBy().value()

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

            classes = _.chain(classes)
              .groupBy('course')
              // it's either a 2018 class or it only happened once
              .filter(classes => classes[0].year === 2018 || classes.length > 1)
              .map(classes => {
                classes = _.sortBy(classes, 'year')
                const years = _.chain(classes).map('year').sortBy().value()
                return {
                  id: classes[0].course,
                  count: classes.length,
                  medianYear: d3.median(years),
                  title: _.last(classes).title,
                  group: id,
                }
              }).value()

            return {
              id,
              title: groupsById[id].title,
              classes,
              words,
              years,
            }
          }).filter(d => d.classes.length && d.words.length)
          .sortBy(d => -d.classes.length - d.words.length)
          .value()

        const years = _.chain(classes).map('year').uniq().value()

        commit('setYears', years)
        commit('setClasses', classes)
        commit('setWords', words)
        commit('setGalaxies', galaxies)
        commit('setGalaxy', galaxies[1])
      })
    },
    startTimer({ commit }) {
      const interval = 600
      setInterval(() => {
        // first, star twinkle
        commit('toggleTwinkle')

        // add interval to sinceLastActivity
        sinceLastActivity += interval
        console.log(sinceLastActivity)
        // if it's been more than 1min
        if (sinceLastActivity > (30 * 1000)) {
          // then i want to start the instructions
          commit('setDisplayInstructions', 'block')
        }
      }, interval)
    },
    resetActivity() {
      sinceLastActivity = 0
    },
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import * as d3 from 'd3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classes: [],
    words: [],
  },
  getters: {
    galaxies({words}) {
      if (!words.length) return

      const classes = {}
      const links = {}
      words = _.chain(words)
        .groupBy(d => d.word)
        // only want words connected to two or more classes
        .filter(words => words.length < 2 ||
          _.chain(words).map('courses').flatten().map('course').uniq().value().length > 1)
        .map(words => {
          const source = {
            id: words[0].word,
            count: words.length,
            ranks: _.map(words, 'rank'),
            years: _.map(words, 'year'),
          }
          // console.log(_.chain(words).map('word').uniq().value(), _.chain(words).map('courses').flatten().groupBy('course').value())

          _.chain(words).map('courses').flatten()
            .sortBy(d => -d.year)
            .each(({course, year, title}) => {
              // for each course, create it if it doesn't yet exist
              if (!classes[course]) {
                classes[course] = {
                  id: course, title,
                  count: 0,
                }
              }

              const target = classes[course]
              target.count += 1

              // and remember the link
              const key = `${source.id},${target.id}`
              if (!links[key]) {
                links[key] = {
                  key,
                  source, target,
                  count: 0,
                }
              }
              const link = links[key]
              link.count += 1
          }).value()
          return source
        }).value()

      // now go through all links and put words, classes, and links in their own galaxies
      let galaxyId = 1
      const galaxies = []
      const galaxiesByNode = {} // key: nodes, value: galaxy
      _.each(links, (link) => {
        const {source, target} = link
        let galaxy = galaxiesByNode[source.id] || galaxiesByNode[target.id]

        if (!galaxy) {
          // if galaxy doesn't exist, create it
          galaxy = {
            id: `galaxy_${galaxyId}`,
            words: [],
            classes: [],
            links: [],
          }
          galaxies.push(galaxy)
          // and then up the galaxy id for next galaxy
          galaxyId += 1
        }

        // if word is new for the galaxy
        if (!galaxiesByNode[source.id]) {
          // then add it
          galaxy.words.push(source)
          galaxiesByNode[source.id] = galaxy
        }
        // if class is new for the galaxy
        if (!galaxiesByNode[target.id]) {
          // then add it
          galaxy.classes.push(target)
          galaxiesByNode[target.id] = galaxy
        }
        galaxy.links.push(link)
      })

      return _.chain(galaxies)
        .filter(d => d.classes.length > 1 && d.classes.length < d.words.length)
        .sortBy(d => -d.links.length)
        .value()
    }
  },
  mutations: {
    setClasses(state, classes) {
      state.classes = classes
    },
    setWords(state, words) {
      state.words = words
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

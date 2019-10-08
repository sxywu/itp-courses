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

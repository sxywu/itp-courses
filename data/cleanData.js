const fs = require('fs')
const _ = require('lodash')
const d3 = require('d3')

let classes = JSON.parse(fs.readFileSync('./data/classes.json', {encoding: 'utf8'}))
let words = JSON.parse(fs.readFileSync('./data/words.json', {encoding: 'utf8'}))

const years = _.chain(classes).map('year').uniq().value()

// first go through and see if the classes are consecutive
let uniqId = 0
_.chain(classes).groupBy('catalog_number')
  .each((classes, id) => {
    // increase the uniqID
    uniqId += 1
    // go through all classes and split them if there's more than a gap of 2 years
    let prevYearIndex = null
    let prevTitle = null
    _.each(classes, (d) => {
      const yearIndex = _.indexOf(years, d.year)
      if (prevYearIndex && yearIndex - prevYearIndex > 1 && prevTitle !== d.title) {
        // if there's a gap, increase the uniq ID
        uniqId += 1
      }
      prevYearIndex = yearIndex
      prevTitle = d.title

      // and then remember that ID in the class
      d.id = `course_${uniqId}`
    })
  }).value()

// now have to make sure those with same title are correctly mapped
const coursesByTitle = _.groupBy(classes, 'title')
const coursesByID = _.groupBy(classes, 'id')
_.each(coursesByID, (classes, id) => {
  // go through each class, see if the same title has other id's
  _.each(classes, d => {
    const ids = _.chain(coursesByTitle[d.title]).uniqBy('id').map('id').without(id).value()
    // go through each class with a different id and remap that id to this one
    _.each(ids, otherId => {
      _.each(coursesByID[otherId], d => d.id = id)
      // then delete the other id
      delete coursesByID[otherId]
    })
  })
})

classes = _.map(classes, ({title, year, id, instructor, catalog_number, credits, description}) =>
  Object.assign({}, {
    id, title, description,
    instructor: instructor.split(', '),
    credits: +(credits.replace(/ points?/, '')),
    year: +year,
    words: [],
  }))

words = _.chain(words)
  .map((words, rank) => {
    return _.map(words, (word, year) => {
      if (!word) return
      const courses = _.filter(classes, d => d.year === +year &&
        _.includes(d.description.toLowerCase(), word))
      // go through those classes and remember the word
      _.each(courses, d => d.words.push(word))
      return {
        word, year: +year, rank: +rank + 1,
        courses: _.map(courses, 'id')
      }
    })
  }).flatten().filter()
  .groupBy('word').filter(words => words.length >= 3)
  .flatten().value()


fs.writeFileSync('./public/classes.json', JSON.stringify(classes))
fs.writeFileSync('./public/words.json', JSON.stringify(words))

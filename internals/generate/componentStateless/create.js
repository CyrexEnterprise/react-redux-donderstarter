const fs = require('fs')
const path = require('path')
const addStyleImport = require('../util/addStyleImport')
const addStoriesImport = require('../util/addStoriesToConfing')
const componentTemplate = require('./templates/component')
const indexTemplate = require('./templates/index')
const stylesTemplate = require('./templates/styles.scss')
const testsTemplate = require('./templates/tests')
const storiesTemplate = require('./templates/stories')

module.exports = function (data) {
  const folder = path.resolve(process.cwd(), 'src', 'components', data.name)

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }

  const withSCSS = data.include.includes('SCSS')
  const mainFile = path.resolve(folder, `${data.name}.js`)
  const indexFile = path.resolve(folder, 'index.js')
  fs.writeFileSync(mainFile, componentTemplate(data.name, withSCSS))
  fs.writeFileSync(indexFile, indexTemplate(data.name))

  if (withSCSS) {
    const stylesFile = path.resolve(folder, '_styles.scss')
    fs.writeFileSync(stylesFile, stylesTemplate(data.name))
    addStyleImport('components', data.name)
  }

  if (data.include.includes('tests')) {
    const testsFile = path.resolve(folder, `${data.name}.test.js`)
    fs.writeFileSync(testsFile, testsTemplate(data.name))
  }

  if (data.include.includes('stories')) {
    const storiesFile = path.resolve(folder, 'stories.js')
    fs.writeFileSync(storiesFile, storiesTemplate(data.name))
    addStoriesImport('components', data.name)
  }
}

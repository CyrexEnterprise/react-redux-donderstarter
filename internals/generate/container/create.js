const fs = require('fs')
const path = require('path')
const addStyleImport = require('../util/addStyleImport')
const addDuckToStore = require('../util/addDuckToStore')
const addSagasToStore = require('../util/addSagasToStore')
const containerTemplate = require('./templates/container')
const ducksTemplate = require('./templates/ducks')
const indexTemplate = require('./templates/index')
const stylesTemplate = require('./templates/styles.scss')
const sagasTemplate = require('./templates/sagas')
const testsTemplate = require('./templates/tests')

module.exports = function (data) {
  const folder = path.resolve(process.cwd(), 'src', 'containers', data.name)

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }

  const withSCSS = data.include.includes('SCSS')
  const withSagas = data.include.includes('sagas')
  const mainFile = path.resolve(folder, `${data.name}.js`)
  const indexFile = path.resolve(folder, 'index.js')
  const ducksFile = path.resolve(folder, 'ducks.js')
  fs.writeFileSync(mainFile, containerTemplate(data.name, withSCSS, withSagas))
  fs.writeFileSync(indexFile, indexTemplate(data.name, withSagas))
  fs.writeFileSync(ducksFile, ducksTemplate(data.name, withSagas))

  addDuckToStore('containers', data.name)

  if (withSCSS) {
    const stylesFile = path.resolve(folder, '_styles.scss')
    fs.writeFileSync(stylesFile, stylesTemplate(data.name))
    addStyleImport('containers', data.name)
  }

  if (withSagas) {
    const sagasFile = path.resolve(folder, 'sagas.js')
    fs.writeFileSync(sagasFile, sagasTemplate())
    addSagasToStore('containers', data.name)
  }

  if (data.include.includes('tests')) {
    const testsFile = path.resolve(folder, `${data.name}.test.js`)
    fs.writeFileSync(testsFile, testsTemplate(data.name, withSagas))
  }
}

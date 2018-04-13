const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const component = require('./component')
const createComponent = require('./component/create')
const componentStateless = require('./componentStateless')
const createComponentStateless = require('./componentStateless/create')
const container = require('./container')
const createContainer = require('./container/create')

const CHOICE_COMPONENT = component.choice
const CHOICE_COMPONENT_STATELESS = componentStateless.choice
const CHOICE_CONTAINER = container.choice

console.log('\nWelcome to donderGenerate')

const questions = [
  {
    type: 'list',
    name: 'generateType',
    message: 'What would you like to generate?',
    choices: [CHOICE_COMPONENT, CHOICE_COMPONENT_STATELESS, CHOICE_CONTAINER]
  },
  {
    type: 'input',
    name: 'name',
    message: 'What should we call it?',
    validate: function (value, data) {
      const rootFolder = data.generateType === 'container' ? 'containers' : 'components'
      const folder = path.resolve(process.cwd(), 'src', rootFolder, value)
      const len = value.length
      let valid = true

      if (len <= 0) {
        valid = 'Please enter a name'
      } else if (fs.existsSync(folder)) {
        valid = `${value} already exists, choose other name or delete existing folder.`
      }

      return valid
    },
    filter: function (val) {
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  }
].concat(component.questions, componentStateless.questions, container.questions)

inquirer.prompt(questions).then(answers => {
  switch (answers.generateType) {
    case CHOICE_COMPONENT:
      return createComponent(answers)
    case CHOICE_COMPONENT_STATELESS:
      return createComponentStateless(answers)
    case CHOICE_CONTAINER:
      return createContainer(answers)
    default:
      break
  }
})

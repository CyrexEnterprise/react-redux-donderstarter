// Container

const choice = 'container'

// Questions
const questions = [
  {
    type: 'checkbox',
    message: 'Include files',
    name: 'include',
    choices: [{ name: 'SCSS' }, { name: 'sagas' }, { name: 'tests' }],
    when: function ({ generateType }) {
      return generateType === choice
    }
  }
]

module.exports = {
  choice,
  questions
}

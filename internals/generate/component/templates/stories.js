module.exports = function (name) {
  return `import React from 'react'
import { storiesOf } from '@storybook/react'
import ${name} from './${name}'

storiesOf('${name}', module)
  .addWithInfo('default', () => (
    <${name} />
  ))
  .addWithInfo('with different color', () => (
    <${name} clicksColor='blue' />
  ))
  .addWithInfo('with increment hidden', () => (
    <${name} hideButton />
  ))
`
}

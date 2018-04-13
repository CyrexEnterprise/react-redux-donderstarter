module.exports = function (name) {
  return `import React from 'react'
import { storiesOf } from '@storybook/react'
import ${name} from './${name}'

storiesOf('${name}', module)
  .addWithInfo('default', () => (
    <${name} counter={0} />
  ))
  .addWithInfo('with different color', () => (
    <${name} counter={0} clicksColor='blue' />
  ))
  .addWithInfo('with increment hidden', () => (
    <${name} counter={0} hideButton />
  ))
`
}

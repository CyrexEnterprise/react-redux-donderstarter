module.exports = function (name) {
  return `import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import ${name} from './${name}'

storiesOf('${name}', module)
  .addDecorator(withInfo({ header: false, inline: true }))
  .add('default', () => (
    <${name} />
  ))
  .add('with different color', () => (
    <${name} clicksColor='blue' />
  ))
  .add('with increment hidden', () => (
    <${name} hideButton />
  ))
`
}

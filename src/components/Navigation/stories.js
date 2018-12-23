import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Navigation from './Navigation'

storiesOf('Navigation', module)
  .addDecorator(withInfo({ header: false, inline: true, excludedPropTypes: ['children'] }))
  .add('default', () => (
    <Navigation title='DonderStarter' />
  ))
  .add('with children on right', () => (
    <Navigation title='DonderStarter'>
      <button>LOGIN</button>
    </Navigation>
  ))

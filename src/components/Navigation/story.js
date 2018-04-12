import React from 'react'
import { storiesOf } from '@storybook/react'
import Navigation from './Navigation'

storiesOf('Navigation', module)
  .addWithInfo('default', () => (
    <Navigation title='DonderStarter' />
  ))
  .addWithInfo('with children on right', () => (
    <Navigation title='DonderStarter'>
      <button>LOGIN</button>
    </Navigation>
  ))

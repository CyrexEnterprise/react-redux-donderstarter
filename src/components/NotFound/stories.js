import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import NotFound from './NotFound'

storiesOf('NotFound', module)
  .addDecorator(withInfo({ header: false, inline: true }))
  .add('default', () => (
    <NotFound />
  ))
  .add('with children on right', () => (
    <NotFound message='Oops! Not found.' />
  ))

import React from 'react'
import { storiesOf } from '@storybook/react'
import NotFound from './NotFound'

storiesOf('NotFound', module)
  .addWithInfo('default', () => (
    <NotFound />
  ))
  .addWithInfo('with children on right', () => (
    <NotFound message='Oops! Not found.' />
  ))

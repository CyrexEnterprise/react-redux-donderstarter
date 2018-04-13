import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'
import store from 'store'
import { translationMessages, formats } from 'util/i18n'
import LanguageProvider from 'containers/LanguageProvider'
import Navigation from './Navigation'

storiesOf('Navigation', module)
  .addDecorator(render => (
    <Provider store={store}>
      <LanguageProvider messages={translationMessages} formats={formats}>
        {render()}
      </LanguageProvider>
    </Provider>
  ))
  .addWithInfo('default', () => (
    <Navigation title='DonderStarter' />
  ))
  .addWithInfo('with children on right', () => (
    <Navigation title='DonderStarter'>
      <button>LOGIN</button>
    </Navigation>
  ))

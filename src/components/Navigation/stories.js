import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Provider } from 'react-redux'
import store from 'store'
import { translationMessages, formats } from 'util/i18n'
import LanguageProvider from 'containers/LanguageProvider'
import Navigation from './Navigation'

storiesOf('Navigation', module)
  .addDecorator(withInfo({ header: false, inline: true, excludedPropTypes: ['children'] }))
  .addDecorator(render => (
    <Provider store={store}>
      <LanguageProvider messages={translationMessages} formats={formats}>
        {render()}
      </LanguageProvider>
    </Provider>
  ))
  .add('default', () => (
    <Navigation title='DonderStarter' />
  ))
  .add('with children on right', () => (
    <Navigation title='DonderStarter'>
      <button>LOGIN</button>
    </Navigation>
  ))

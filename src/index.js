
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from 'store'
import { translationMessages, formats } from 'util/i18n'

import ErrorMonitor from 'components/ErrorMonitor'
import LanguageProvider from 'containers/LanguageProvider'
import App from 'containers/App'

// Main Application Styles
import 'styles/app.scss'

function render (Component) {
  ReactDOM.render(
    <ErrorMonitor>
      <Provider store={store}>
        <LanguageProvider messages={translationMessages} formats={formats}>
          <ConnectedRouter history={history}>
            <Route path='/' component={Component} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    </ErrorMonitor>,
    document.getElementById('root')
  )
}

render(App)

// Enable HMR for js files
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    render(NextApp)
  })
}

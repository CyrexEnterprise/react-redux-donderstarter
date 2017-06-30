
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from 'store'
import { translationMessages } from 'util/i18n'

// route components
import LanguageProvider from 'containers/LanguageProvider'
import App from 'components/App'

// Main Application Styles
import 'styles/app.scss'

function render (Component) {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <ConnectedRouter history={history}>
          <Route path='/' component={Component} />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    document.getElementById('root')
  )
}

render(App)

// Enable HMR for js files
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(NextApp)
  })
}

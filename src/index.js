
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from 'store'

import ErrorMonitor from 'components/ErrorMonitor'
import App from 'containers/App'

// Main Application Styles
import 'styles/app.scss'

function render (Component) {
  ReactDOM.render(
    <ErrorMonitor>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path='/' component={Component} />
        </ConnectedRouter>
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

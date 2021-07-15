
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router-dom'
import store, { history } from 'store'
import App from 'containers/App'

// Main Application Styles
import 'styles/app.scss'

function render (Component) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Component} />
      </Router>
    </Provider>,
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

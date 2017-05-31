
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from 'store'

// route components
import App from 'components/App'

// Main Application Styles
import 'styles/app.scss'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className='routerRoot'>
        <Route path='/' component={App} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// Enable HMR for js files
if (module.hot) {
  module.hot.accept()
}

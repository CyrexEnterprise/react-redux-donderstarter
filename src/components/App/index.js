
import React from 'react'

import routes from './routes'

const App = () => (
  <div style={styles.container}>
    {routes()}
  </div>
)

const styles = {
  container: {
    display: 'flex',
    minHeight: '100%'
  }
}

export default App

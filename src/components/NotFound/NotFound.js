import React from 'react'
import { string } from 'prop-types'

const NotFound = ({ message }) => (
  <div style={styles.container}>
    <h4>
      {message}
    </h4>
  </div>
)

NotFound.defaultProps = {
  message: '404 Page Not Found',
}

NotFound.propTypes = {
  /**
   * Error message to be displayed
   */
  message: string,
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
}

export default NotFound

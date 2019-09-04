import * as React from 'react'
import { NotFoundProps } from './types'

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
}

const NotFound: React.FC<NotFoundProps> = ({ message = '404 Page Not Found', style, ...rest }) => (
  <div style={{ ...styles.container, ...style }} {...rest}>
    <h4>
      {message}
    </h4>
  </div>
)

export default NotFound

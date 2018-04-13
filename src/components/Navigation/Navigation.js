import React from 'react'
import { string, node } from 'prop-types'

const Navigation = ({ title, children }) => (
  <div className='navigation'>
    <div className='app-bar'>
      <h3>{title}</h3>
      <div className='center-content' />
      <div>{children}</div>
    </div>
  </div>
)

Navigation.propTypes = {
  /**
   * The navigation title
   */
  title: string.isRequired,
  /**
   * Children components to be rendered on the right
   */
  children: node
}

export default Navigation

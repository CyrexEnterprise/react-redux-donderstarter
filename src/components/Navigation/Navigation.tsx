import * as React from 'react'
import clsx from 'clsx'
import { NavigationProps } from './types'

import './styles.scss'

const Navigation: React.FC<NavigationProps> = ({ title, className, children, ...rest }) => (
  <div className={clsx('navigation', className)} {...rest}>
    <div className='app-bar'>
      <h3>{title}</h3>
      <div className='center-content' />
      <div>{children}</div>
    </div>
  </div>
)

export default Navigation

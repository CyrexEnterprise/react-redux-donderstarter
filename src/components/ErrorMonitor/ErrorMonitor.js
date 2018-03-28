import React, { Component } from 'react'
import { node } from 'prop-types'

class ErrorMonitor extends Component {
  state = {
    hasError: false,
    error: '',
    errorStack: ''
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error, errorStack: info.componentStack })

    // Log the error to an error reporting service
    // logErrorToMyService(error, info)
  }

  renderError () {
    const { error, errorStack } = this.state
    const stack = errorStack.split('\n').map((line, indx) => <div key={indx}>{line}</div>)
    return [
      <div key='error'>{error.toString()}</div>,
      ...stack
    ]
  }

  render () {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1>Oops!</h1>
          <div style={styles.errorInfo}>
            {this.renderError()}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  },
  errorInfo: {
    color: 'red'
  }
}

ErrorMonitor.propTypes = {
  children: node
}

export default ErrorMonitor

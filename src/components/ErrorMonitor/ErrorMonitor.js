import React, { Component } from 'react'
import { node } from 'prop-types'
import request from 'util/request'
import { API_URL } from 'constants/endpoints'

const __DEV__ = process.env.NODE_ENV !== 'production'

class ErrorMonitor extends Component {
  state = {
    hasError: false,
    error: '',
    errorStack: ''
  }

  componentDidCatch (error, info) {
    if (__DEV__) {
      // Display fallback UI
      this.setState({ hasError: true, error, errorStack: info.componentStack })
    } else {
      // Log the error to an error reporting service
      // we don't care if it was successful or not
      const headers = { 'Content-Type': 'application/json' }
      const body = JSON.stringify({ error: error.toString(), info })
      request(`${API_URL}/errors`, { method: 'POST', headers, body })
    }
  }

  refreshWindow = () => {
    location.reload()
  }

  renderError () {
    const { error, errorStack } = this.state
    const stack = errorStack.split('\n').map((line, indx) => <div key={indx}>{line}</div>)

    if (__DEV__) {
      return [
        <div key='error'>{error.toString()}</div>,
        ...stack,
        <button key='refresh' onMouseUp={this.refreshWindow}>RELOAD</button>
      ]
    }

    return [
      <div key='message'>Something went wrong! We are trying to fix it.</div>,
      <button key='refresh' onMouseUp={this.refreshWindow}>RELOAD</button>
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

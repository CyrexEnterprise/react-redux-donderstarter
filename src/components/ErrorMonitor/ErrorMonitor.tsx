import * as React from 'react'
import request from 'util/request'
import { API_URL } from 'constants/endpoints'
import { __DEV__ } from 'constants/env'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  } as React.CSSProperties,
  errorInfo: {
    color: 'red',
  },
}

class ErrorMonitor extends React.Component {
  public state = {
    hasError: false,
    error: '',
    errorStack: '',
  }

  public componentDidCatch (error: any, info: any) {
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

  public render () {
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

  private handleMouseUp = () => {
    location.reload()
  }

  private renderError () {
    const { error, errorStack } = this.state
    const stack = errorStack.split('\n').map((line, indx) => <div key={indx}>{line}</div>)

    if (__DEV__) {
      return [
        <div key='error'>{error.toString()}</div>,
        ...stack,
        <button key='refresh' onMouseUp={this.handleMouseUp}>RELOAD</button>,
      ]
    }

    return [
      <div key='message'>Something went wrong! We are trying to fix it.</div>,
      <button key='refresh' onMouseUp={this.handleMouseUp}>RELOAD</button>,
    ]
  }
}

export default ErrorMonitor

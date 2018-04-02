const styles = `
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%'
  }
}
`

module.exports = function (name, withStylesheet) {
  const className = name.charAt(0).toLowerCase() + name.slice(1)
  return `import React, { Component } from 'react'
import { bool, string } from 'prop-types'

class ${name} extends Component {
  state = {
    counter: 0
  }

  increment = () => {
    const { counter } = this.state
    this.setState({ counter: counter + 1 })
  }

  render () {
    const { counter } = this.state
    const { hideButton, clicksColor } = this.props

    return (
      <div ${withStylesheet ? `className='${className}'` : `style={styles.container}`}>
        <div>${name} component</div>
        <div style={{ color: clicksColor }}>{counter} clicks!</div>
        {!hideButton && <button onClick={this.increment}>CLICK ME</button>}
      </div>
    )
  }
}
${withStylesheet ? '' : styles}
${name}.defaultProps = {
  clicksColor: '#FFC107'
}

${name}.propTypes = {
  /**
   * Hides the increment button
   */
  hideButton: bool,
  /**
   * The color of clicks text
   */
  clicksColor: string
}

export default ${name}
`
}

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
const compWillmount = `
  componentWillMount () {
    const { loaded, loadIncrement } = this.props

    if (!loaded) {
      loadIncrement()
    }
  }
`

const props = `,
  /**
   * Flag if the counter was already loaded
   */
  loaded: bool,
  /**
   * Loads initial increment counter
   */
  loadIncrement: func.isRequired`

module.exports = function (name, withStylesheet, withSagas) {
  const className = name.charAt(0).toLowerCase() + name.slice(1)
  return `import React, { Component } from 'react'
import { bool, string, number, func } from 'prop-types'

class ${name} extends Component {${withSagas ? compWillmount : ''}
  render () {
    const { hideButton, clicksColor, counter, increment } = this.props

    return (
      <div ${withStylesheet ? `className='${className}'` : `style={styles.container}`}>
        <div>${name} component</div>
        <div style={{ color: clicksColor }}>{counter} clicks!</div>
        {!hideButton && <button onClick={increment}>CLICK ME</button>}
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
  clicksColor: string,
  /**
   * The counter to show
   */
  counter: number.isRequired,
  /**
   * Increments the counter in store
   */
  increment: func.isRequired${withSagas ? props : ''}
}

export default ${name}
`
}

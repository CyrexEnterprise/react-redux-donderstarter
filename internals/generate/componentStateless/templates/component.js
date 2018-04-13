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
  return `import React from 'react'
import { bool, string, number, func } from 'prop-types'

const ${name} = ({ hideButton, clicksColor, counter, onButtonClick }) => (
  <div ${withStylesheet ? `className='${className}'` : `style={styles.container}`}>
    <div>${name} component</div>
    <div style={{ color: clicksColor }}>{counter} clicks!</div>
    {!hideButton && <button onClick={onButtonClick}>CLICK ME</button>}
  </div>
)
${withStylesheet ? '' : styles}
${name}.defaultProps = {
  clicksColor: '#FFC107',
  onButtonClick: () => {}
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
   * callback when button is clicked
   */
  onButtonClick: func
}

export default ${name}
`
}

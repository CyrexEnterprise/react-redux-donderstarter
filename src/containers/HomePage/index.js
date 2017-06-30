
import React from 'react'
import PropTypes from 'prop-types'

const HomePage = (props, ctx) => (
  <div style={styles.container}>Hello world! i18n => {ctx.intl.messages['test']} </div>
)

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

HomePage.contextTypes = {
  intl: PropTypes.object.isRequired
}

export default HomePage


import React from 'react'
import PropTypes from 'prop-types'
import LocaleSelect from 'containers/LocaleSelect'

const HomePage = (props, ctx) => (
  <div style={styles.container}>
    <LocaleSelect />
    <div>
      {ctx.intl.messages['hello']}
    </div>
  </div>
)

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

HomePage.contextTypes = {
  intl: PropTypes.object.isRequired
}

export default HomePage

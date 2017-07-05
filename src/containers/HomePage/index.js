
import React from 'react'
import PropTypes from 'prop-types'
import LocaleSelect from 'containers/LocaleSelect'

const HomePage = (props, ctx) => (
  <div style={styles.container}>
    <LocaleSelect />
    <div>
      Hello world! i18n => {ctx.intl.messages['test']}
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

/*
 *
 * Language Provider
 *
 * connects the redux state locale to the
 * IntlProvider component and i18n messages
 * loaded from `src/translations`.
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

class LanguageProvider extends Component {
  render () {
    const {
      locale,
      messages,
      children
    } = this.props

    return (
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
      >
        {React.Children.only(children)}
      </IntlProvider>
    )
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

const mapStateToProps = ({ locale }) => (locale)

export default connect(mapStateToProps)(LanguageProvider)

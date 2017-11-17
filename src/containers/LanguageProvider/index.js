/**
 * Connects the redux state locale to the
 * IntlProvider component and i18n messages
 * loaded from `src/translations`.
 * @module LanguageProvider
 */

import React, { Component } from 'react'
import { object, element } from 'prop-types'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'

class LanguageProvider extends Component {
  render () {
    const {
      lang,
      messages,
      formats,
      children
    } = this.props

    return (
      <IntlProvider
        locale={lang.locale}
        messages={messages[lang.locale]}
        formats={formats}
      >
        {React.Children.only(children)}
      </IntlProvider>
    )
  }
}

LanguageProvider.defaultProps = {
  formats: {}
}

LanguageProvider.propTypes = {
  lang: object.isRequired,
  messages: object.isRequired,
  formats: object,
  children: element.isRequired
}

const mapStateToProps = ({ lang }) => ({ lang })

export default connect(mapStateToProps)(LanguageProvider)

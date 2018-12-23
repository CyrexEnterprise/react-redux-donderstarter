/**
 * Connects the redux state locale to the
 * IntlProvider component and i18n messages
 * loaded from `src/translations`.
 * @module LanguageProvider
 */

import React, { Component } from 'react'
import { object, element } from 'prop-types'
import { IntlProvider } from 'react-intl'

class LanguageProvider extends Component {
  render () {
    const {
      lang,
      messages,
      formats,
      children,
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
  formats: {},
}

LanguageProvider.propTypes = {
  /**
   * Selected locale and available locales object
   */
  lang: object.isRequired,
  /**
   * Translated messages object
   */
  messages: object.isRequired,
  /**
   * Intl formats used on translations
   */
  formats: object,
  /**
   * The children to be rendered
   */
  children: element.isRequired,
}

export default LanguageProvider

/**
 * @module LanguageProvider/LocaleSelect
 */

import React from 'react'
import { object, func } from 'prop-types'

const LocaleSelect = ({ lang, onLocalChange }) => (
  <select
    defaultValue={lang.locale}
    onChange={onLocalChange}
  >
    {lang.locales.map(locale =>
      <option
        key={locale}
        value={locale}
      >{locale}</option>
    )}
  </select>
)

LocaleSelect.propTypes = {
  /**
   * Selected locale and available locales object
   */
  lang: object.isRequired,
  /**
   * Triggers local change
   */
  onLocalChange: func.isRequired,
}

export default LocaleSelect

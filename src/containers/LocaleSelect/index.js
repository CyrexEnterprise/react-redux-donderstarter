/**
 * @module LanguageProvider/LocaleSelect
 */

import React from 'react'
import { object, func } from 'prop-types'
import { connect } from 'react-redux'
import { changeLocale } from 'containers/LanguageProvider/ducks'

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
  lang: object.isRequired,
  onLocalChange: func.isRequired,
}

const mapStateToProps = ({ lang }) => ({ lang })

const mapDispatchToProps = (dispatch) => ({
  onLocalChange: ({ target: { value } }) => dispatch(changeLocale(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSelect)

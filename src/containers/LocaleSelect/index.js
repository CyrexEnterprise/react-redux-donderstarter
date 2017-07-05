
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { appLocales } from 'util/i18n'
import { changeLocale } from 'containers/LanguageProvider/actions'

const LocaleSelect = ({ locale, onLocalChange }) => (
  <select
    defaultValue={locale}
    onChange={onLocalChange}
  >
    {appLocales.map(locale =>
      <option
        key={locale}
        value={locale}
      >{locale}</option>
    )}
  </select>
)

LocaleSelect.propTypes = {
  locale: PropTypes.string.isRequired,
  onLocalChange: PropTypes.func.isRequired
}

const mapStateToProps = ({ locale }) => (locale)

const mapDispatchToProps = (dispatch) => ({
  onLocalChange: ({ target: { value } }) => dispatch(changeLocale(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSelect)

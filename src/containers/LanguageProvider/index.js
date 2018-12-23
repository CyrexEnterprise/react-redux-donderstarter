
import { connect } from 'react-redux'
import LanguageProvider from './LanguageProvider'
import LocaleSelectComponent from './LocaleSelect'
import { changeLocale } from './ducks'

/**
 * Conected LanguageProvider
 * It passes store lang which is used to get the language translations
 *
 */
const LanguageProviderMapStateToProps = ({ lang }) => ({ lang })
export default connect(LanguageProviderMapStateToProps)(LanguageProvider)

/**
 * Connected LocalSelect
 * It passes store lang which is used to display available languages
 * translations and also trigger change of the locale selected.
 *
 */
const LocaleSelectMapStateToProps = ({ lang }) => ({ lang })
const LocaleSelectMapDispatchToProps = (dispatch) => ({
  onLocalChange: ({ target: { value } }) => dispatch(changeLocale(value)),
})

export const LocaleSelect = connect(LocaleSelectMapStateToProps, LocaleSelectMapDispatchToProps)(LocaleSelectComponent)

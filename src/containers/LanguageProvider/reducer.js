/*
 *
 * Locale reducer
 *
 */

import { appLocales } from 'util/i18n'
import { localGet } from 'util/storage'
import { CHANGE_LOCALE } from './constants'

const validateLocale = () => {
  const locale = localGet('_lang')
  if (appLocales.indexOf(locale) !== -1) return locale

  return 'en'
}

const initialState = {
  locale: validateLocale()
}

function languageProviderReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.locale }
    default:
      return state
  }
}

export default languageProviderReducer

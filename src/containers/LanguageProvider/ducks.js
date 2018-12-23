/**
 * @module LanguageProvider/ducks
 */

import update from 'immutability-helper'
import { appLocales } from 'util/i18n'
import { localGet, localPut } from 'util/storage'

/**
 * Constants
 */
export const CHANGE_LOCALE = 'languageProvider/CHANGE_LOCALE'

/**
 * Validates localStorage language string an sets that locale
 * if valid. Defaults to `en`.
 */
export const validateLocale = () => {
  const locale = localGet('_lang')
  if (appLocales.indexOf(locale) !== -1) return locale

  return 'en'
}

/**
 * Locale state
 * @typedef {Object} state
 * @prop {string} locale - the current selected locale
 * @prop {string[]} locales - the available locales
 */
const initialState = {
  locale: validateLocale(),
  locales: appLocales,
}

/**
 * Reducer
 * @param {state} state Locale state or initialState
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return update(state, {
        locale: { $set: action.locale },
      })
    default:
      return state
  }
}

/**
 * change locale action creator
 * @param {string} locale - the locale string
 */
export function changeLocale (locale) {
  return { type: CHANGE_LOCALE, locale }
}

/**
 * LanguageProvider store middleware
 *
 * Intercepts locale changes and saves it to local storage
 * sowhen the user reloads or comes back it can presist.
 */
export const localeMiddleware = (store) => (next) => (action) => {
  next(action)
  if (action.type === CHANGE_LOCALE) {
    localPut('_lang', action.locale)
  }
}

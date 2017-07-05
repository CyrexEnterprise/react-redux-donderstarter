/**
 *
 * LanguageProvider Actions
 *
 */

import { CHANGE_LOCALE } from './constants'

export const changeLocale = (locale) => ({ type: CHANGE_LOCALE, locale })

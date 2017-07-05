/*
 *
 * LanguageProvider Middleware
 *
 */

import { localPut } from 'util/storage'
import { CHANGE_LOCALE } from './constants'

const authMiddleware = (store) => (next) => (action) => {
  next(action)
  if (action.type === CHANGE_LOCALE) {
    localPut('_lang', action.locale)
  }
}

export default authMiddleware

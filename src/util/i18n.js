/**
 * Internationalization configuration
 * @module util/i18n
 */

import { addLocaleData } from 'react-intl'

/**
 * Import the wanted locale data
 */
import enLocaleData from 'react-intl/locale-data/en'
import ptLocaleData from 'react-intl/locale-data/pt'
import nlLocaleData from 'react-intl/locale-data/nl'

/**
 * Import te string translations
 */
import enTranslationMessages from 'translations/en.json'
import ptTranslationMessages from 'translations/pt.json'
import nlTranslationMessages from 'translations/nl.json'

/**
 * We need to add the locales to `react-intl`
 */
addLocaleData(enLocaleData)
addLocaleData(ptLocaleData)
addLocaleData(nlLocaleData)

/**
 * Add the locale options to be selected on the dropdown
 */
export const appLocales = [
  'en',
  'pt',
  'nl',
]

/**
 * Configure formats here to be used in string translations
 */
export const formats = {
  number: {
    GBP: {
      style: 'currency',
      currency: 'GBP',
    },
    EUR: {
      style: 'currency',
      currency: 'EUR',
    },
  },
}

/**
 * Translation message
 * @typedef {Object} message
 * @prop {string} id - the message id
 * @prop {string} defaultMessage - the fallback string
 * @prop {string} message - the translated string
 */

/**
 * Creates an object with messages
 * @param {message[]} messages - the translation object
 */
const formatTranslationMessages = (messages) => {
  const formattedMessages = {}
  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage
  }

  return formattedMessages
}

/**
 * Export messages by locale
 */
export const translationMessages = {
  en: formatTranslationMessages(enTranslationMessages),
  pt: formatTranslationMessages(ptTranslationMessages),
  nl: formatTranslationMessages(nlTranslationMessages),
}

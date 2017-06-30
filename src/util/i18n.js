/*
 *
 * i18n
 *
 * This will setup the i18n language files and locale data for app.
 *
 */

import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import ptLocaleData from 'react-intl/locale-data/pt'
import nlLocaleData from 'react-intl/locale-data/nl'

import enTranslationMessages from 'translations/en.json'
import ptTranslationMessages from 'translations/pt.json'
import nlTranslationMessages from 'translations/nl.json'

addLocaleData(enLocaleData)
addLocaleData(ptLocaleData)
addLocaleData(nlLocaleData)

export const appLocales = [
  'en',
  'pt',
  'nl'
]

const formatTranslationMessages = (messages) => {
  const formattedMessages = {}
  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage
  }

  return formattedMessages
}

export const translationMessages = {
  en: formatTranslationMessages(enTranslationMessages),
  pt: formatTranslationMessages(ptTranslationMessages),
  nl: formatTranslationMessages(nlTranslationMessages)
}

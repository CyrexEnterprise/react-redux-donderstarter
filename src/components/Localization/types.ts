import { Scope, TranslateOptions } from 'i18n-js'

export type Locales = 'en-US' | 'pt-PT' | 'nl-NL'

export type Strings = (name: Scope, options?: TranslateOptions) => string

export type SetLocale = (locale: Locales) => Promise<void>

export interface LocalizationProviderProps {
  storageKey?: string,
}

export interface I18nContextState {
  initLoad: boolean,
  locale: Locales,
  appLocales: Locales[],
  seti18n: SetLocale,
  strings: Strings,
}

export interface WithLocalizationProps {
  locale: I18nContextState['locale'],
  appLocales: I18nContextState['appLocales'],
  setLocale: I18nContextState['seti18n'],
  strings: I18nContextState['strings'],
}

import * as React from 'react'
import i18n from 'i18n-js'
import moment from 'moment'
import { __DEV__ } from 'constants/env'
import Context, { defaultContextState } from './context'

import { Locales, Strings, I18nContextState, LocalizationProviderProps } from './types'

class Provider extends React.PureComponent<LocalizationProviderProps, I18nContextState> {
  private localStorageKey: string

  public constructor (props: LocalizationProviderProps) {
    super(props)

    this.localStorageKey = props.storageKey || 'lng'

    this.state = {
      ...defaultContextState,
      seti18n: this.seti18n,
      strings: this.strings,
    }

    const locale = this.findBestAvailableLocale(defaultContextState.appLocales[0])

    this.seti18n(locale)
  }

  public render () {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }

  private seti18n = async (locale: Locales) => {
    if (this.state.initLoad || locale !== this.state.locale) {
      try {
        const translations = await import(
          /* webpackChunkName: "translation-[request]" */
          `translations/${locale}.json`
        )

        const normalizedLocale = locale.split('-')[0]

        if (normalizedLocale !== 'en') {
          await import(
            /* webpackChunkName: "locale-[request]", webpackInclude: /(pt|nl)\.js$/ */
            `moment/locale/${normalizedLocale}.js`
          )
        }

        i18n.locale = locale
        i18n.translations = { [locale]: translations }

        moment.locale(normalizedLocale)

        this.setState({ locale, initLoad: false })

        localStorage.setItem(this.localStorageKey, locale)
      } catch (error) {
        if (__DEV__) {
          console.error(error)
        }
      }
    }
  }

  private strings: Strings = (name, options) => {
    return i18n.t(name, options)
  }

  private getBrowserLocales = () => {
    const locales = []

    try {
      const stored = localStorage.getItem(this.localStorageKey)
      stored && locales.push(stored)
    } catch (error) {
      if (__DEV__) {
        console.error('Get item in local storage:', error)
      }
    }

    if (typeof navigator !== 'undefined') {
      if (navigator.languages) { // chrome only; not an array, so can't use .push.apply instead of iterating
        for (const language of navigator.languages) {
          locales.push(language)
        }
      }

      if (navigator.language) {
        locales.push(navigator.language)
      }
    }

    return Array.from(new Set(locales))
  }

  private findBestAvailableLocale (defaultLocale: Locales) {
    let locale = defaultLocale

    const found = this.getBrowserLocales()

    if (found.length > 0) {
      const { appLocales } = this.state

      for (const lcFound of found) {
        const localeIndex = appLocales
          .findIndex((appLocale) => appLocale === lcFound || appLocale.split('-')[0] === lcFound)

        if (localeIndex > -1) {
          locale = appLocales[localeIndex]
          break
        }
      }
    }

    return locale
  }
}

export default Provider

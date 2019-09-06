import * as React from 'react'
import { I18nContextState } from './types'

export const defaultContextState: I18nContextState = {
  initLoad: true,
  locale: 'en-US',
  appLocales: ['en-US', 'pt-PT', 'nl-NL'],
  seti18n: async () => undefined,
  strings: () => '',
}

const Context: React.Context<I18nContextState> = React.createContext(defaultContextState)

export default Context

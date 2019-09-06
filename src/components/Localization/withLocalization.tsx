import * as React from 'react'
import Context from './context'

import { WithLocalizationProps } from './types'

type Diff<T, K> = Pick<T, Exclude<keyof T, K>>
type Subtract<T, K> = Diff<T, keyof K>

export default function withLocalization<P extends WithLocalizationProps> (Component: React.ComponentType<P>) {
  return function LocalizedComponent (props: Subtract<P, WithLocalizationProps>) {
    return (
      <Context.Consumer>
        {(context) => (
          <Component
            {...props as P}
            locale={context.locale}
            setLocale={context.seti18n}
            appLocales={context.appLocales}
            strings={context.strings}
          />
        )}
      </Context.Consumer>
    )
  }
}

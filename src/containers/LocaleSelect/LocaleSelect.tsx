import * as React from 'react'
import { LocaleSelectProps } from './types'

const createOnChange = (fn: Function) => (event: React.ChangeEvent<HTMLSelectElement>) => fn(event.target.value)

const LocaleSelect: React.FC<LocaleSelectProps> = ({ appLocales, locale, setLocale, strings, ...rest }) => (
  <select
    {...rest}
    value={locale}
    onChange={createOnChange(setLocale)}
  >
    {appLocales.map((locale) =>
      <option
        key={locale}
        value={locale}
      >
        {locale.split('-')[0]}
      </option>
    )}
  </select>
)

export default LocaleSelect


import React from 'react'
import { shallow } from 'enzyme'
import { IntlProvider } from 'react-intl'
import LanguageProvider from './LanguageProvider'
import LocaleSelect from './LocaleSelect'
import reducer, { validateLocale, changeLocale, localeMiddleware } from './ducks'
import { appLocales } from 'util/i18n'

describe('<LanguageProvider />', () => {
  const MockElement = () => (<div />)
  const props = {
    lang: { locale: 'en' },
    messages: { en: {} },
    children: <MockElement />,
  }

  it('should render IntlProvider', () => {
    const wrapper = shallow(<LanguageProvider {...props} />)
    expect(wrapper.find(IntlProvider).length).toEqual(1)
  })

  describe('reducer', () => {
    const initialState = {
      locale: validateLocale(),
      locales: appLocales,
    }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should set locale on CHANGE_LOCALE', () => {
      expect(reducer(initialState, changeLocale(appLocales[1]))).toEqual({...initialState, locale: appLocales[1]})
    })
  })

  describe('middleware', () => {
    const create = () => {
      const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn(),
      }

      const next = jest.fn()

      const invoke = (action) => localeMiddleware(store)(next)(action)

      return { store, next, invoke, history }
    }

    it('should allways call next with the action and not perform any action', () => {
      const { next, invoke } = create()
      const action = {type: 'TEST'}
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
      expect(global.localStorage.getItem('_lang')).toBeFalsy()
    })

    it('should set localStorage _lang on CHANGE_LOCALE', () => {
      const { next, invoke } = create()
      const action = changeLocale(appLocales[1])
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
      expect(global.localStorage.getItem('_lang')).toEqual(appLocales[1])
    })
  })
})

describe('<LocaleSelect />', () => {
  const props = {
    lang: { locale: 'en', locales: ['en', 'pt', 'nl'] },
    messages: { en: {} },
    onLocalChange: jest.fn(),
  }

  const wrapper = shallow(<LocaleSelect {...props} />)

  it('should be a select', () => {
    expect(wrapper.type()).toEqual('select')
  })

  it('should have all options as in locales', () => {
    expect(wrapper.find('option').length).toEqual(props.lang.locales.length)
  })

  it('should call onLocalChange with selected value', () => {
    const event = { target: { value: 'pt' } }
    wrapper.find('select').simulate('change', event)

    expect(props.onLocalChange).toHaveBeenCalledWith(event)
  })
})

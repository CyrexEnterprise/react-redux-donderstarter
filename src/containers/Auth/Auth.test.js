
import React from 'react'
import { mount } from 'enzyme'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { loginSaga, authLoginSaga } from './sagas'
import RequireAuth from './RequireAuth'
import reducer, { login, loginSuccess, loginError, authLogin, authLoginSuccess, authLoginError, logout, createAuthMiddleware, TOKEN_KEY } from './ducks'

describe('<RequireAuth />', () => {
  const props = {
    history: { replace: jest.fn() },
    location: { pathname: '/' },
    user: {},
    isAuthorizing: false,
    Component: () => (<div />),
    scopesRequired: ['user'],
  }

  const wrapper = mount(<RequireAuth {...props} />)

  it('should not be authorized by default', () => {
    expect(wrapper.state().isAuthorized).toEqual(false)
  })

  it('should call redirect', () => {
    expect(props.history.replace).toHaveBeenCalledTimes(1)
  })

  it('should not redirect if authorizing', () => {
    wrapper.setProps({ isAuthorizing: true })
    expect(props.history.replace).toHaveBeenCalledTimes(1)
  })

  it('should check authorization when it receives new props', () => {
    const checkAuthSpy = jest.spyOn(wrapper.instance(), 'checkAuth')
    wrapper.setProps({ user: { scope: ['user'] }, isAuthorizing: false })

    expect(checkAuthSpy).toHaveBeenCalled()
  })

  const credentialsMock = { email: 'foo', password: 'bar' }
  const tokenMock = 'abc.123.xxx'
  const initialState = { authToken: null, user: {}, isAuthorizing: false }
  const dataMock = { 'id': 0, 'name': 'Zé', 'scope': ['user'], 'token': tokenMock }
  const errorMock = { message: 'error-stub' }
  const fullState = { authToken: 'abc.123.xxx', user: dataMock, isAuthorizing: true }

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should set authorizing flag on LOGIN_USER', () => {
      expect(reducer(initialState, login(credentialsMock))).toEqual({...initialState, isAuthorizing: true})
    })

    it('should set authorizing flag on AUTH_LOGIN_USER', () => {
      expect(reducer(initialState, authLogin(tokenMock))).toEqual({...initialState, isAuthorizing: true})
    })

    it('should set the user, token and set authorizing flag on LOGIN_USER_SUCCESS', () => {
      expect(
        reducer(
          {...initialState, isAuthorizing: true},
          loginSuccess(dataMock)
        )).toEqual({...initialState, user: dataMock, authToken: dataMock.token})
    })

    it('should set the user and authorizing flag on AUTH_LOGIN_USER_SUCCESS', () => {
      expect(
        reducer(
          {...initialState, isAuthorizing: true, authToken: 'abc.123.xxx'},
          authLoginSuccess(dataMock)
        )).toEqual({...initialState, user: dataMock, authToken: 'abc.123.xxx'})
    })

    it('should reset state on LOGIN_USER_ERROR', () => {
      expect(reducer({...fullState}, loginError(errorMock))).toEqual({...initialState})
    })

    it('should reset state on AUTH_LOGIN_USER_ERROR', () => {
      expect(reducer({...fullState}, authLoginError(errorMock))).toEqual({...initialState})
    })

    it('should reset state on LOGOUT_USER', () => {
      expect(reducer({...fullState}, logout())).toEqual({...initialState})
    })
  })

  describe('sagas', () => {
    it('should call login API and return a user object', () => {
      const fakeCredentials = { email: 'foo', password: 'bar' }
      const fakeUser = { name: 'John', role: 'user' }
      const fakeResponse = { data: fakeUser }

      return expectSaga(loginSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(loginSuccess(fakeUser))
        .dispatch(login(fakeCredentials))
        .silentRun()
    })

    it('should call login API and handle the error', () => {
      const fakeResponse = { err: errorMock }

      return expectSaga(loginSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(loginError(errorMock))
        .dispatch(login(credentialsMock))
        .silentRun()
    })

    it('should call authorization API and return user object', () => {
      const fakeResponse = { data: dataMock }

      return expectSaga(authLoginSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(authLoginSuccess(dataMock))
        .dispatch(authLogin(tokenMock))
        .silentRun()
    })

    it('should call authorization API and handle the error', () => {
      const fakeResponse = { err: errorMock }

      return expectSaga(authLoginSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(authLoginError(errorMock))
        .dispatch(authLogin(tokenMock))
        .silentRun()
    })
  })

  describe('middleware', () => {
    const create = () => {
      const history = {
        replace: jest.fn(),
        location: {},
      }
      const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn(),
      }

      const next = jest.fn()

      const invoke = (action) => createAuthMiddleware(history)(store)(next)(action)

      return { store, next, invoke, history }
    }

    it('should allways call next with the action and not perform any action', () => {
      const { next, invoke, history } = create()
      const action = {type: 'TEST'}
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
      expect(history.replace).not.toHaveBeenCalled()
      expect(global.document.cookie).toEqual('')
    })

    it('should save a token cookie on LOGIN_USER_SUCCESS and replace the path', () => {
      const { next, invoke, history } = create()
      const action = loginSuccess(dataMock)
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
      expect(global.document.cookie).toEqual(`${TOKEN_KEY}=${tokenMock}`)
      expect(history.replace).toHaveBeenCalled()
    })

    it('should remove the token cookie on AUTH_LOGIN_USER_ERROR', () => {
      const { next, invoke } = create()
      const action = authLoginError(errorMock)

      expect(global.document.cookie).toEqual(`${TOKEN_KEY}=${tokenMock}`)

      invoke(action)

      expect(global.document.cookie).toEqual('')
      expect(next).toHaveBeenCalledWith(action)
    })

    it('should remove the token cookie on LOGOUT_USER and replace the path', () => {
      const { next, invoke, history } = create()
      invoke(loginSuccess(dataMock))

      const action = logout()
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
      expect(global.document.cookie).toEqual('')
      expect(history.replace).toHaveBeenCalledTimes(2)
    })
  })
})

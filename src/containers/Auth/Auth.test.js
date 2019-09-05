
import React from 'react'
import { mount } from 'enzyme'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import * as matchers from 'redux-saga-test-plan/matchers'
import { TOKEN_KEY } from 'constants/env'
import rootSaga from './sagas'
import RequireAuth from './RequireAuth'
import reducer, { authActionCreators, authMiddleware } from './ducks'

describe('<RequireAuth />', () => {
  const props = {
    history: { replace: jest.fn() },
    location: { pathname: '/' },
    user: undefined,
    scopes: [],
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

  it('should change state to authorized when receives the correct scopes', () => {
    expect(wrapper.state().isAuthorized).toBe(false)
    wrapper.setProps({ scopes: ['user'], isAuthorizing: false })
    expect(wrapper.state().isAuthorized).toBe(true)
  })

  const credentialsMock = { email: 'foo', password: 'bar' }
  const tokenMock = 'abc.123.xxx'
  const initialState = { authToken: undefined, user: undefined, isAuthorizing: false }
  const userMock = { id: 0, name: 'Zé', scope: ['user'] }
  const errorMock = { message: 'error-stub' }
  const fullState = { authToken: tokenMock, user: userMock, isAuthorizing: true }

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should set authorizing flag on LOGIN_USER', () => {
      expect(reducer(initialState, authActionCreators.login(credentialsMock)))
        .toEqual({ ...initialState, isAuthorizing: true })
    })

    it('should set authorizing flag on AUTH_LOGIN_USER', () => {
      expect(reducer({ ...initialState, authToken: tokenMock }, authActionCreators.authLogin()))
        .toEqual({ ...initialState, authToken: tokenMock, isAuthorizing: true })
    })

    it('should set the user, token and set authorizing flag on LOGIN_USER_SUCCESS', () => {
      expect(
        reducer(
          { ...initialState, isAuthorizing: true },
          authActionCreators.loginSuccess({ user: userMock, token: tokenMock })
        )).toEqual({ ...initialState, user: userMock, authToken: tokenMock })
    })

    it('should set the user and authorizing flag on AUTH_LOGIN_USER_SUCCESS', () => {
      expect(
        reducer(
          { ...initialState, isAuthorizing: true, authToken: tokenMock },
          authActionCreators.authLoginSuccess({ user: userMock })
        )).toEqual({ ...initialState, user: userMock, authToken: tokenMock })
    })

    it('should reset state on LOGIN_USER_ERROR', () => {
      expect(reducer({ ...fullState }, authActionCreators.loginError(errorMock))).toEqual({ ...initialState })
    })

    it('should reset state on AUTH_LOGIN_USER_ERROR', () => {
      expect(reducer({ ...fullState }, authActionCreators.authLoginError(errorMock))).toEqual({ ...initialState })
    })

    it('should reset state on LOGOUT_USER', () => {
      expect(reducer({ ...fullState }, authActionCreators.logout())).toEqual({ ...initialState })
    })
  })

  describe('sagas', () => {
    const fakeCredentials = { email: 'foo', password: 'bar' }
    const fakeResponse = { ...userMock, token: tokenMock }
    const fakeError = errorMock

    it('should call login API and return a user object', () => {
      return expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(authActionCreators.loginSuccess({ user: userMock, token: tokenMock }))
        .dispatch(authActionCreators.login(fakeCredentials))
        .silentRun()
    })

    it('should call login API and handle the error', () => {
      return expectSaga(rootSaga)
        .provide([[matchers.call.fn(request), throwError(fakeError)]])
        .put(authActionCreators.loginError(errorMock))
        .dispatch(authActionCreators.login(credentialsMock))
        .silentRun()
    })

    it('should call authorization API and return user object', () => {
      return expectSaga(rootSaga)
        .withState({ auth: { ...initialState, authToken: tokenMock } })
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(authActionCreators.authLoginSuccess({ user: userMock }))
        .dispatch(authActionCreators.authLogin())
        .silentRun()
    })

    it('should call authorization API and handle the error', () => {
      return expectSaga(rootSaga)
        .withState({ auth: { ...initialState, authToken: tokenMock } })
        .provide([[matchers.call.fn(request), throwError(fakeError)]])
        .put(authActionCreators.authLoginError(errorMock))
        .dispatch(authActionCreators.authLogin())
        .silentRun()
    })
  })

  describe('middleware', () => {
    const create = () => {
      const store = {
        getState: jest.fn(() => ({ router: { location: '/' } })),
        dispatch: jest.fn(),
      }

      const next = jest.fn()

      const invoke = (action) => authMiddleware(store)(next)(action)

      return { store, next, invoke }
    }

    it('should allways call next with the action and not perform any action', () => {
      const { next, invoke } = create()
      const action = { type: 'TEST' }
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
      expect(global.document.cookie).toEqual('')
    })

    it('should save a token cookie on LOGIN_USER_SUCCESS and replace the path', () => {
      const { next, invoke } = create()
      const action = authActionCreators.loginSuccess({ user: userMock, token: tokenMock })
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
      expect(global.document.cookie).toEqual(`${TOKEN_KEY}=${tokenMock}`)
    })

    it('should remove the token cookie on AUTH_LOGIN_USER_ERROR', () => {
      const { next, invoke } = create()
      const action = authActionCreators.authLoginError(errorMock)

      expect(global.document.cookie).toEqual(`${TOKEN_KEY}=${tokenMock}`)

      invoke(action)

      expect(global.document.cookie).toEqual('')
      expect(next).toHaveBeenCalledWith(action)
    })

    it('should remove the token cookie on LOGOUT_USER and replace the path', () => {
      const { next, invoke } = create()
      invoke(authActionCreators.loginSuccess({ user: userMock, token: tokenMock }))

      const action = authActionCreators.logout()
      invoke(action)

      expect(next).toHaveBeenCalledWith(action)
      expect(global.document.cookie).toEqual('')
    })
  })
})

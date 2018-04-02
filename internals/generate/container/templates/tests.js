module.exports = function (name, withSagas) {
  const reducerName = name.charAt(0).toLowerCase() + name.slice(1)
  return withSagas
    ? `import React from 'react'
import { mount } from 'enzyme'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { select } from 'redux-saga/effects'
import ${name} from './${name}'
import reducer, { loadIncrementSuccess, loadIncrementError, incrementSuccess, incrementError, loadIncrement, increment } from './ducks'
import { loadIncrementSaga, incrementSaga } from './sagas'

describe('<${name} />', () => {
  const props = {
    counter: 0,
    increment: jest.fn(),
    loaded: false,
    loadIncrement: jest.fn()
  }

  const wrapper = mount(<${name} {...props} />)

  it('should call loadIncrement if loaded is false', () => {
    expect(props.loadIncrement).toHaveBeenCalledTimes(1)
    wrapper.setProps({ loaded: true })
  })

  it('should not call loadIncrement if loaded is true', () => {
    props.loadIncrement.mockReset()
    wrapper.unmount().mount()
    expect(props.loadIncrement).toHaveBeenCalledTimes(0)
  })

  it('should update call increment on button click', () => {
    expect(props.increment).toHaveBeenCalledTimes(0)
    wrapper.find('button').simulate('click')
    expect(props.increment).toHaveBeenCalledTimes(1)
  })

  it('should hide the button on props change', () => {
    expect(wrapper.find('button')).toHaveLength(1)
    wrapper.setProps({ hideButton: true })
    expect(wrapper.find('button')).toHaveLength(0)
  })

  describe('reducer', () => {
    const initialState = {
      counter: 0,
      loaded: false,
      error: null
    }

    const successMock = { total: 2 }
    const errorMock = { message: 'error-load-mock' }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should set counter and loaded to true on INCREMENT_LOAD_SUCCESS', () => {
      expect(reducer(initialState, loadIncrementSuccess(successMock)))
        .toEqual({...initialState, loaded: true, counter: successMock.total})
    })

    it('should set error and loaded to false on INCREMENT_LOAD_ERROR', () => {
      expect(reducer(initialState, loadIncrementError(errorMock)))
        .toEqual({...initialState, error: errorMock.message})
    })

    it('should set counter on INCREMENT_SUCCESS', () => {
      expect(reducer(initialState, incrementSuccess(successMock)))
        .toEqual({...initialState, counter: successMock.total})
    })

    it('should set error on INCREMENT_ERROR', () => {
      expect(reducer(initialState, incrementError(errorMock)))
        .toEqual({...initialState, error: errorMock.message})
    })
  })

  describe('sagas', () => {
    it('should call load increment API and return a total', () => {
      const successMock = { total: 4 }
      const fakeResponse = { data: successMock }

      return expectSaga(loadIncrementSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(loadIncrementSuccess(successMock))
        .dispatch(loadIncrement())
        .silentRun()
    })

    it('should call load increment API and handle the error', () => {
      const errorMock = { message: 'error-mock' }
      const fakeResponse = { err: errorMock }

      return expectSaga(loadIncrementSaga)
        .provide([[matchers.call.fn(request), fakeResponse]])
        .put(loadIncrementError(errorMock))
        .dispatch(loadIncrement())
        .silentRun()
    })

    it('should call increment API and return a total', () => {
      const successMock = { total: 1 }
      const fakeResponse = { data: successMock }
      const reducerMock = { ${reducerName}: reducer(undefined, {}) }

      return expectSaga(incrementSaga)
        .provide([
          [matchers.call.fn(request), fakeResponse],
          [select(), reducerMock]
        ])
        .put(incrementSuccess(successMock))
        .dispatch(increment())
        .silentRun()
    })

    it('should call increment API and handle the error', () => {
      const errorMock = { message: 'error-mock' }
      const fakeResponse = { err: errorMock }
      const reducerMock = { ${reducerName}: reducer(undefined, {}) }

      return expectSaga(incrementSaga)
        .provide([
          [matchers.call.fn(request), fakeResponse],
          [select(), reducerMock]
        ])
        .put(incrementError(errorMock))
        .dispatch(increment())
        .silentRun()
    })
  })
})
`
    : `import React from 'react'
import { shallow } from 'enzyme'
import ${name} from './${name}'
import reducer, { increment } from './ducks'

describe('<${name} />', () => {
  const props = {
    counter: 0,
    increment: jest.fn()
  }

  const wrapper = shallow(<${name} {...props} />)

  it('should update call increment on button click', () => {
    expect(props.increment).toHaveBeenCalledTimes(0)
    wrapper.find('button').simulate('click')
    expect(props.increment).toHaveBeenCalledTimes(1)
  })

  it('should hide the button on props change', () => {
    expect(wrapper.find('button')).toHaveLength(1)
    wrapper.setProps({ hideButton: true })
    expect(wrapper.find('button')).toHaveLength(0)
  })

  describe('reducer', () => {
    const initialState = {
      counter: 0
    }

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should set counter on INCREMENT', () => {
      expect(reducer(initialState, increment()))
        .toEqual({...initialState, counter: 1})
    })
  })
})
`
}


import React from 'react'
import { shallow } from 'enzyme'
import Login from './Login'

describe('<Login />', () => {
  const logUserInSpy = jest.fn()
  const wrapper = shallow(<Login logUserIn={logUserInSpy} />)
  const loginButton = wrapper.find('button')

  const email = 'email-stub'
  const password = 'password-stub'

  it('shoud not call onButtonClick if email or password empty', () => {
    loginButton.simulate('click')
    expect(logUserInSpy).not.toHaveBeenCalled()
  })

  it('should change email and password state on input change', () => {
    const initState = wrapper.state()
    expect(initState.email).toBe('')
    expect(initState.password).toBe('')

    const instance = wrapper.instance()

    instance.inputChange({ target: { name: 'email', value: email } })
    expect(wrapper.state().email).toBe(email)

    instance.inputChange({ target: { name: 'password', value: password } })
    expect(wrapper.state().password).toBe(password)
  })

  it('shoud not call onButtonClick with email and password values', () => {
    loginButton.simulate('click')
    expect(logUserInSpy).toHaveBeenCalledWith({ email, password })
  })
})

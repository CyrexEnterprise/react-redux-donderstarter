module.exports = function (name) {
  return `import React from 'react'
import { shallow } from 'enzyme'
import Foo from './Foo'

describe('<Foo />', () => {
  const spy = jest.fn()
  const wrapper = shallow(<Foo counter={0} onButtonClick={spy} />)

  it('should call onButtonClick', () => {
    expect(spy).not.toHaveBeenCalled()
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should hide the button on props change', () => {
    expect(wrapper.find('button')).toHaveLength(1)
    wrapper.setProps({ hideButton: true })
    expect(wrapper.find('button')).toHaveLength(0)
  })
})
`
}

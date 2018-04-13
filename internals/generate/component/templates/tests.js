module.exports = function (name) {
  return `import React from 'react'
import { shallow } from 'enzyme'
import ${name} from './${name}'

describe('<${name} />', () => {
  const wrapper = shallow(<${name} />)

  it('should update state on button click', () => {
    expect(wrapper.state().counter).toEqual(0)
    wrapper.find('button').simulate('click')
    expect(wrapper.state().counter).toEqual(1)
  })

  it('should hide the button on props change', () => {
    expect(wrapper.find('button')).toHaveLength(1)
    wrapper.setProps({ hideButton: true })
    expect(wrapper.find('button')).toHaveLength(0)
  })
})
`
}

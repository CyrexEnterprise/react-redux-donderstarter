
import React from 'react'
import { shallow } from 'enzyme'
import NotFound from 'components/NotFound'

describe('<NotFound />', () => {
  const wrapper = shallow(<NotFound />)

  it('should display 404 Page Not Found in an <h4/>', () => {
    expect(wrapper.contains(<h4>404 Page Not Found</h4>)).toEqual(true)
  })

  it('should change <h4/> text', () => {
    const message = 'text=stub'
    wrapper.setProps({ message })

    expect(wrapper.contains(<h4>{message}</h4>)).toEqual(true)
  })
})

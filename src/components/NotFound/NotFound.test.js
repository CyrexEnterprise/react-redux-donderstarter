
import React from 'react'
import { shallow } from 'enzyme'
import NotFound from 'components/NotFound'

describe('<NotFound />', () => {
  const wrapper = shallow(<NotFound />)

  it('should display 404 Page Not Found in an <h4/>', () => {
    expect(wrapper.contains(<h4>404 Page Not Found</h4>)).toEqual(true)
  })
})

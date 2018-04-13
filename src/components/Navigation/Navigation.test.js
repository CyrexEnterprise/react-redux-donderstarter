import React from 'react'
import { shallow } from 'enzyme'
import Navigation from './Navigation'

describe('<Navigation />', () => {
  const title = 'title-stub'
  const Child = () => <button />

  const wrapper = shallow(<Navigation title={title}><Child /></Navigation>)

  it('should render title', () => {
    expect(wrapper.find('h3').text()).toEqual(title)
  })

  it('should render children', () => {
    expect(wrapper.find(Child)).toHaveLength(1)
  })
})

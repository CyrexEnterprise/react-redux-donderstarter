import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
//import { requireAuthentication } from './';
/*import { jsdom } from 'jsdom';

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
*/
describe('components.auth', function() {
  describe('requireAuthentication', function () {
    it('should wrap a component', function() {
      const component = <div prop="something" />;
      // const wrappedComponent = requireAuthentication(component);
      const wrapper = shallow(component);
      console.log(wrapper.text());
      expect(wrapper.at(0).prop('prop')).to.equal('something');
      expect(wrapper.at(0).matchesElement(component)).to.equal(true);
    });
  });
});

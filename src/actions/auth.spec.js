import * as ActionCreators from './auth';
import initialState from '../reducers/initialState';

import { expect } from 'chai';

describe('actions.auth', () => {
  const appState = initialState;

  it('should create an action to login', () => {
    const actual = ActionCreators.login(appState);
    const expected = {
      type: 'LOGIN'
    };

    expect(actual).to.deep.equal(expected); // Notice use of deep because it's a nested object
    // expect(actual).to.equal(expected); // Fails. Not deeply equal
  });
});

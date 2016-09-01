import axios from 'axios';

export function login({
  redirectTo
}) {
  return {
    type: 'LOGIN',
    payload: Promise.resolve({
      token: 'test'
    })
  }
}

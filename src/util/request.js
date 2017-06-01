/*
 *
 * Request
 * fetch wrapper
 *
 */

import 'whatwg-fetch'

function checkStatus (response) {
  if (response.ok) {
    return Promise.resolve(response.json())
  }

  return response.json().then(json => {
    const reason = {
      status: response.status,
      statusText: response.statusText,
      message: json.message || response.statusText
    }

    return Promise.reject(reason)
  })
}

export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}

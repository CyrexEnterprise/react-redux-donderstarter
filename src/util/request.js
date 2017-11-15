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
    /**
     * Parsed error from server response
     * @typedef {Object} ServerError
     * @prop {number} status - response status
     * @prop {string} statusText - response status text
     * @prop {string} message - response message
     */
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

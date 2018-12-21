/*
 *
 * Request
 * fetch wrapper
 *
 */

function checkStatus (response) {
  if (response.ok) {
    const contentType = response.headers.get('Content-Type')

    if (/application\/json/.test(contentType)) {
      return Promise.resolve(response.json())
    }

    return Promise.resolve(response.text())
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
      message: json.message || response.statusText,
    }

    return Promise.reject(reason)
  })
}

export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(data => ({ data }))
}

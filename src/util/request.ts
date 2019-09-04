/*
 * Request
 * fetch wrapper
 */

export interface ErrorReason {
  /** response status */
  status: number,
  /** response status text */
  statusText: string,
  /** response message */
  message: string,
}

async function checkStatus (response: Response) {
  if (response.ok) {
    const contentType = response.headers.get('Content-Type')

    if (contentType && /application\/json/.test(contentType)) {
      return Promise.resolve(response.json())
    }

    return Promise.resolve(response.text())
  }

  const json = await response.json()

  const reason: ErrorReason = {
    status: response.status,
    statusText: response.statusText,
    message: json.message || response.statusText,
  }

  return Promise.reject(reason)
}

export default async function request (input: RequestInfo, init: RequestInit) {
  const response = await fetch(input, init)

  return checkStatus(response)
}

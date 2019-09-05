/* Default headers for API calls */

import { Store } from 'store/types'

function getDefaultHeders (state: Store) {
  if (state.auth.authToken) {
    return {
      Authorization: `Bearer ${state.auth.authToken}`,
    }
  }

  return {}
}

export default getDefaultHeders

/*
 *
 * Default headers for API calls
 *
 */

function getDefaultHeders (state) {
  if (state && state.auth && state.auth.authToken) {
    return {
      Authorization: `Bearer ${state.auth.authToken}`,
    }
  }

  return {}
}

export default getDefaultHeders

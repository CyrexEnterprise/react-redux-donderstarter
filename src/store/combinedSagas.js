/*
 *
 * Combine all sagas in the this file
 * and export them.
 *
 */

import AuthSagas from 'containers/Auth/sagas'

const sagas = [
  ...AuthSagas,
]

export default sagas

import { RouterState } from 'connected-react-router'

import { AuthStoreState } from 'containers/Auth/types'

export interface Store {
  /** router store state */
  router: RouterState,
  /** auth store */
  auth: AuthStoreState,
}

import { Location, History } from 'history'
import { RouteProps } from 'react-router'
import { Store } from 'store/types'

export interface AppProps extends AppMapDispatchToProps {
  /** Auth */
  auth: Store['auth'],
  /** History.location */
  location: Location<any>,
  /** History */
  history: History<any>,
}

export interface AppRouteProps extends RouteProps {
  /** should the route have top navigation */
  navigation?: boolean,
}

export interface AppMapDispatchToProps {
  userAuthLogin: () => void,
  logUserOut: () => void,
}

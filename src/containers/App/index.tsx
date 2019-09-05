
import { connect, MapDispatchToPropsFunction } from 'react-redux'
import App from './App'

import { authActionCreators } from 'containers/Auth/ducks'

import { Store } from 'store/types'
import { AppMapDispatchToProps } from './types'

const mapStateToProps = ({ auth }: Store) => ({ auth })

const mapDispatchToProps: MapDispatchToPropsFunction<AppMapDispatchToProps, any> = (dispatch) => ({
  userAuthLogin: () => dispatch(authActionCreators.authLogin()),
  logUserOut: () => dispatch(authActionCreators.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

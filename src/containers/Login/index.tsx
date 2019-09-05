import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { authActionCreators } from 'containers/Auth/ducks'
import Login from './Login'

import { LoginProps } from './types'

const mapDispatchToProps: MapDispatchToPropsFunction<LoginProps, any> = (dispatch) => ({
  logUserIn: (...args) => dispatch(authActionCreators.login(...args)),
})

export default connect(null, mapDispatchToProps)(Login)

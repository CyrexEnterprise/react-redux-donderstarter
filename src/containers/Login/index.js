import { connect } from 'react-redux'
import { login } from 'containers/Auth/ducks'
import Login from './Login'

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (credentials) => dispatch(login(credentials)),
})

export default connect(null, mapDispatchToProps)(Login)

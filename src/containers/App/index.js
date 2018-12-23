
import { connect } from 'react-redux'
import { authLogin, logout } from 'containers/Auth/ducks'
import App from './App'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = (dispatch) => ({
  userAuthLogin: (token) => dispatch(authLogin(token)),
  logUserOut: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

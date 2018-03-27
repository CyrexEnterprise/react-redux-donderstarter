
import { connect } from 'react-redux'
import { authLogin } from 'containers/Auth/ducks'
import App from './App'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = (dispatch) => ({
  userAuthLogin: (token) => dispatch(authLogin(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

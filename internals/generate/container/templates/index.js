const loadIncrement = function () {
  return `,
  loadIncrement: () => dispatch(loadIncrement())`
}

module.exports = function (name, withSagas) {
  const lowerName = name.charAt(0).toLowerCase() + name.slice(1)
  return `import { connect } from 'react-redux'
import ${name} from './${name}'
import { increment${withSagas ? ', loadIncrement' : ''} } from './ducks'

const mapStateToProps = ({ ${lowerName} }) => ({ ...${lowerName} })
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment())${withSagas ? loadIncrement() : ''}
})

export default connect(mapStateToProps, mapDispatchToProps)(${name})
`
}

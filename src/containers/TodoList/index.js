
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

import { createTodo, deleteTodo } from './ducks'
import TodoList from './TodoList'

const mapStateToProps = ({ firebase }) => ({
  todos: firebase.data.todos
})

const mapDispatchToProps = (dispatch) => ({
  // fetchTodos: () => dispatch(fetchTodos()),
  createTodo: (todo) => dispatch(createTodo(todo)),
  deleteTodo: (id) => dispatch(deleteTodo(id))
})

export default compose(
  firebaseConnect([
    'todos'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(TodoList)

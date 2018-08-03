import React, { Component } from 'react'
import { string, object, func } from 'prop-types'
import { firebase } from 'react-redux-firebase'

class TodoListItem extends Component {
    handleDone = todoId => {
      const { deleteTodo, firebase } = this.props
      // deleteTodo(todoId)
      firebase.remove(`/todos/${todoId}`)
    }

    render () {
      const { todoId, todo } = this.props
      return (
        <div key='todo-list-item' className='todo-list-item'>
          <div>{todo.title}{' '}</div>
          <div
            className='done-button'
            onClick={() => this.handleDone(todoId)}
          >
            Done
          </div>
        </div>
      )
    }
}

TodoListItem.propTypes = {
  firebase: object.isRequired,
  todoId: string.isRequired,
  todo: object.isRequired,
  deleteTodo: func.isRequired
}

export default firebase()(TodoListItem)

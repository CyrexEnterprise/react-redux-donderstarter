import React, { Component } from 'react'
import { string, object, func } from 'prop-types'

class TodoListItem extends Component {
    handleDone = todoId => {
      this.props.deleteTodo({ id: todoId })
    }

    render () {
      const { todoId, todo } = this.props
      return (
        <div key='todo-list-item' className='todo-list-item'>
          <div>{todo.title}</div>
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
  todoId: string.isRequired,
  todo: object.isRequired,
  deleteTodo: func.isRequired
}

export default TodoListItem

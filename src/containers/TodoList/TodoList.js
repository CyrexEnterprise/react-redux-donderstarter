
import React, { Component } from 'react'
import { object, func } from 'prop-types'
import _ from 'lodash'
import TodoListItem from './TodoListItem'
import { isLoaded, isEmpty } from 'react-redux-firebase'

import 'firebase/database'

class TodoList extends Component {
  state = {
    todo: ''
  };

  handleInputChange = event => {
    this.setState({ todo: event.target.value })
  };

  handleFormSubmit = event => {
    const { todo } = this.state
    const { createTodo } = this.props
    event.preventDefault()

    createTodo({ title: todo })
    this.setState({ todoValue: '' })
  };

  renderAddForm = () => {
    const { todo } = this.state
    return (
      <div id='todo-add' className='todo-form'>
        <form onSubmit={this.handleFormSubmit}>
          <div className='input-field'>
            New Todo: <input
              value={todo}
              onChange={this.handleInputChange}
              type='text'
            />
          </div>
        </form>
      </div>
    )
  };

  renderToDos () {
    const { todos, deleteTodo } = this.props
    const toDoList = !isLoaded(todos)
      ? 'Loading'
      : isEmpty(todos)
        ? 'Todo list is empty'
        : Object.keys(todos).map(
          (key, id) => (
            <TodoListItem key={key} todoId={key} todo={todos[key]} deleteTodo={deleteTodo} />
          )
        )
    if (!_.isEmpty(toDoList)) {
      return toDoList
    }
  }

  render () {
    return (
      <div className='todo-list-container'>
        <div className='row'>
          {this.renderAddForm()}
          {this.renderToDos()}
        </div>
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: object,
  // fetchTodos: func.isRequired,
  createTodo: func.isRequired,
  deleteTodo: func.isRequired,
  firebase: object
}

export default TodoList

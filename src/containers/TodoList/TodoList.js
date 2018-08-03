
import React, { Component } from 'react'
import { object, func } from 'prop-types'
import _ from 'lodash'
import ToDoListItem from './TodoListItem'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import 'firebase/database'

class TodoList extends Component {
  state = {
    todoValue: ''
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value })
  };

  handleFormSubmit = event => {
    const { addFormValue } = this.state
    const { createTodo, firebase } = this.props
    event.preventDefault()

    // firebase.push('todos', { title: addFormValue })
    createTodo({ title: addFormValue })
    this.setState({ addFormValue: '' })
  };

  renderAddForm = () => {
    const { todoValue } = this.state
    return (
      <div id='todo-add' className='todo-form'>
        <form onSubmit={this.handleFormSubmit}>
          <div className='input-field'>
            New Todo: <input
              value={todoValue}
              onChange={this.handleInputChange}
              type='text'
            />
          </div>
        </form>
      </div>
    )
  };

  renderToDos () {
    const { todos } = this.props
    const toDoList = !isLoaded(todos)
      ? 'Loading'
      : isEmpty(todos)
        ? 'Todo list is empty'
        : Object.keys(todos).map(
          (key, id) => (
            <ToDoListItem key={key} todoId={key} todo={todos[key]} />
          )
        )
    if (!_.isEmpty(toDoList)) {
      return toDoList
    }
  }

  // componentWillMount () {
  //   this.props.fetchTodos()
  // }

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

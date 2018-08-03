/*
 *
 * Combine all sagas in the this file
 * and export them.
 *
 */

import AuthSagas from 'containers/Auth/sagas'
import TodoListSagas from 'containers/TodoList/sagas'

const sagas = [
  ...AuthSagas,
  ...TodoListSagas
]

export default sagas

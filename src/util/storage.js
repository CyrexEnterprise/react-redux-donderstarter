/*
 *
 * Local Storage
 *
 */

export function localPut (key, value) {
  window.localStorage.setItem(key, value)
}

export function localGet (key) {
  return window.localStorage.getItem(key)
}

export function localRemove (key) {
  return window.localStorage.removeItem(key)
}

export function localClear () {
  window.localStorage.clear()
}

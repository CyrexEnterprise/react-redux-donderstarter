/*
 *
 * Local Storage
 *
 */

export function localPut (key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch (err) {
    console.error(err)
  }
}

export function localGet (key) {
  try {
    return window.localStorage.getItem(key)
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export function localRemove (key) {
  try {
    return window.localStorage.removeItem(key)
  } catch (err) {
    console.log(err)
  }
}

export function localClear () {
  try {
    window.localStorage.clear()
  } catch (err) {
    console.error(err)
  }
}

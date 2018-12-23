// requestAnimationFrame
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0)
}

// local storage
global.localStorage = {
  _data: {},
  setItem: function (id, val) { this._data[id] = String(val) },
  getItem: function (id) { return this._data.hasOwnProperty(id) ? this._data[id] : undefined },
  removeItem: function (id) { return delete this._data[id] },
  clear: function () { this._data = {} },
}

// fetch mock
global.fetch = require('jest-fetch-mock')

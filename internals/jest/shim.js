// requestAnimationFrame
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0)
}

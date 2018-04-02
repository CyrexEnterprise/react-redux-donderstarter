module.exports = function (name) {
  const className = name.charAt(0).toLowerCase() + name.slice(1)
  return `
.${className} {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
`
}

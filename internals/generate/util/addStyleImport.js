const fs = require('fs')
const path = require('path')

module.exports = function (folder, name) {
  const stylesPath = path.resolve(process.cwd(), 'src', 'styles', 'app.scss')

  let body = fs.readFileSync(stylesPath).toString()

  body = body.split('\n')
  body.splice(body.length - 1, 0, `@import '../${folder}/${name}/styles';`)

  const output = body.join('\n')
  fs.writeFileSync(stylesPath, output)
}

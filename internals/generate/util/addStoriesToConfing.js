const fs = require('fs')
const path = require('path')

module.exports = function (folder, name) {
  const configPath = path.resolve(process.cwd(), 'src', 'storybook', 'config.js')

  let body = fs.readFileSync(configPath).toString()

  body = body.split('\n')

  let i = 0
  const leng = body.length
  let lastRequireLine = -1
  for (i; i < leng; i++) {
    if (RegExp('\\brequire\\b').test(body[i])) {
      lastRequireLine = i
    }
  }

  body.splice(lastRequireLine + 1, 0, `  require('../${folder}/${name}/stories')`)

  const output = body.join('\n')
  fs.writeFileSync(configPath, output)
}

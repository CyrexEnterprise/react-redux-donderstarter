const fs = require('fs')
const path = require('path')

module.exports = function (folder, name) {
  const reducersPath = path.resolve(process.cwd(), 'src', 'store', 'combinedReducers.js')

  let body = fs.readFileSync(reducersPath).toString()

  body = body.split('\n')

  let i = 0
  const leng = body.length
  let lastImportLine = -1
  for (i; i < leng; i++) {
    if (RegExp('\\bimport\\b').test(body[i])) {
      lastImportLine = i
    }
  }

  const variableName = name.charAt(0).toLowerCase() + name.slice(1)

  body.splice(lastImportLine + 1, 0, `import ${variableName} from '${folder}/${name}/ducks'`)
  body.splice(body.length - 3, 1, `${body[body.length - 3]},`)
  body.splice(body.length - 2, 0, `  ${variableName}`)

  const output = body.join('\n')
  fs.writeFileSync(reducersPath, output)
}

const fs = require('fs')
const path = require('path')

module.exports = function (folder, name) {
  const sagasPath = path.resolve(process.cwd(), 'src', 'store', 'combinedSagas.js')

  let body = fs.readFileSync(sagasPath).toString()

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

  body.splice(lastImportLine + 1, 0, `import ${variableName} from '${folder}/${name}/sagas'`)
  body.splice(body.length - 4, 0, `  ${variableName},`)

  const output = body.join('\n')
  fs.writeFileSync(sagasPath, output)
}

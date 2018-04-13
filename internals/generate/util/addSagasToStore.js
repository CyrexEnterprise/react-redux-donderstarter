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

  body.splice(lastImportLine + 1, 0, `import ${name}Sagas from '${folder}/${name}/sagas'`)
  body.splice(body.length - 5, 1, `${body[body.length - 5]},`)
  body.splice(body.length - 4, 0, `  ...${name}Sagas`)

  const output = body.join('\n')
  fs.writeFileSync(sagasPath, output)
}

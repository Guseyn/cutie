'use strict'

const spawn = require('child_process').spawn

module.exports = (process, file, callback) => {
  const lint = spawn('./node_modules/.bin/eslint', [file], {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
  lint.on('close', (code) => {
    if (code === 0) {
      console.log('\x1b[32m%s\x1b[0m', `lint has executed successfully: everything is ok for ${file}`)
      callback(null, process)
    } else {
      callback(new Error(`lint failed with code ${code}`))
    }
  })
}

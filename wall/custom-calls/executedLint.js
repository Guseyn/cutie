'use strict'

const spawn = require('child_process').spawn

module.exports = (process, files, callback) => {
  const lint = spawn('./node_modules/.bin/eslint', files, {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
  lint.on('close', (code) => {
    if (code === 0) {
      console.log('\x1b[32m%s\x1b[0m', `lint has executed successfully: everything is ok for ${files.join(', ')}`)
      callback(null, process)
    } else {
      callback(new Error(`lint failed for ${files.join(', ')} with code ${code}`))
    }
  })
}

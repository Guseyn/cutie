'use strict'

const spawn = require('child_process').spawn

module.exports = (process, format, callback) => {
  const testCoverage = spawn('./node_modules/.bin/nyc', ['report', '--reporter', format], {
    stdio: [process.stdin, process.stdout, process.stderr]
  })
  testCoverage.on('close', (code) => {
    if (code === 0) {
      callback(null, process)
    } else {
      callback(new Error(`test coverage report failed with code ${code}`))
    }
  })
}

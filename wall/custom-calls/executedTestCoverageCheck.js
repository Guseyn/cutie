'use strict'

const spawn = require('child_process').spawn

module.exports = (process, { lines, functions, branches }, callback) => {
  const testCoverage = spawn(
    './node_modules/.bin/nyc',
    ['check-coverage', '--lines', lines || 90, '--functions', functions || 90, '--branches', branches || 90],
    { stdio: [process.stdin, process.stdout, process.stderr] }
  )
  testCoverage.on('close', (code) => {
    if (code === 0) {
      callback(null, process)
    } else {
      callback(new Error(`test coverage configuration failed with code ${code}`))
    }
  })
}

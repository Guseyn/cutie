'use strict'

const { AsyncObject } = require('./../index')
const executedTestCoverageReport = require('./custom-calls/executedTestCoverageReport')

// Represented result is process
class ExecutedTestCoverageReport extends AsyncObject {
  constructor (process, format) {
    super(process, format || 'text')
  }

  definedAsyncCall () {
    return executedTestCoverageReport
  }
}

module.exports = ExecutedTestCoverageReport

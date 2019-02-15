'use strict'

const { AsyncObject } = require('./../index')
const executedLint = require('./custom-calls/executedLint')

// Represented result is process
class ExecutedLint extends AsyncObject {
  constructor (process, file) {
    super(process, file)
  }

  definedAsyncCall () {
    return executedLint
  }
}

module.exports = ExecutedLint

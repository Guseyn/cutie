'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class ErrorAssertion extends AsyncObject {
  constructor (error1, error2) {
    super(error1, error2)
  }

  definedSyncCall() {
    return (error1, error2) => {
      assert.deepStrictEqual(error1, error2)
    }
  }
}

module.exports = BrokenAsyncObject

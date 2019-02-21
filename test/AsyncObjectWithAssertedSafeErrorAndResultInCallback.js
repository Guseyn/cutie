'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class AsyncObjectWithAssertedSafeErrorAndResultInCallback extends AsyncObject {
  constructor () {
    super()
  }

  asyncCall () {
    return (callback) => {
      return callback(null, 'result')
    }
  }

  onErrorAndResult (error, result) {
    assert.strictEqual(super.onErrorAndResult(error, result), 'result')
    return result
  }

  continueAfterFail () {
    return true
  }
}

module.exports = AsyncObjectWithAssertedSafeErrorAndResultInCallback

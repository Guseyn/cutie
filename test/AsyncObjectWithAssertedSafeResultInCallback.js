'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class AsyncObjectWithAssertedSafeResultInCallback extends AsyncObject {
  constructor () {
    super()
  }

  asyncCall () {
    return (callback) => {
      return callback(null, 'result')
    }
  }

  onErrorAndResult (error, result) {
    assert.strictEqual(error, null)
    assert.strictEqual(result, 'result')
    return result
  }

  continueAfterFail () {
    return true
  }
}

module.exports = AsyncObjectWithAssertedSafeResultInCallback

'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class AsyncObjectWithAssertedSafeErrorInCallback extends AsyncObject {
  constructor () {
    super()
  }

  asyncCall () {
    return (callback) => {
      return callback(new Error('safe async error'), 'result')
    }
  }

  onErrorAndResult (error, result) {
    assert.deepStrictEqual(error, new Error('safe async error'))
    assert.strictEqual(result, 'result')
    return error
  }

  continueAfterFail () {
    return true
  }
}

module.exports = AsyncObjectWithAssertedSafeErrorInCallback

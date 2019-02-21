'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class AsyncObjectWithAssertedSafeErrorInDefinedCall extends AsyncObject {
  constructor () {
    super()
  }

  asyncCall () {
    return () => {
      throw new Error('safe async error')
    }
  }

  onErrorAndResult (error) {
    assert.deepStrictEqual(error, new Error('safe async error'))
  }

  continueAfterFail () {
    return true
  }
}

module.exports = AsyncObjectWithAssertedSafeErrorInDefinedCall

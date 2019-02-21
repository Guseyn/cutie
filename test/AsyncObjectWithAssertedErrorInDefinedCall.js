'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class AsyncObjectWithAssertedErrorInDefinedCall extends AsyncObject {
  constructor () {
    super()
  }

  asyncCall () {
    return () => {
      throw new Error('async error')
    }
  }

  onError (error) {
    assert.deepStrictEqual(error, new Error('async error'))
  }
}

module.exports = AsyncObjectWithAssertedErrorInDefinedCall

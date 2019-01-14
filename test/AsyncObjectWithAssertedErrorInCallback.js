'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class AsyncObjectWithAssertedErrorInCallback extends AsyncObject {
  constructor () {
    super()
  }

  definedAsyncCall () {
    return (callback) => {
      return callback(new Error('async error'))
    }
  }

  onError (error) {
    assert.deepStrictEqual(error, new Error('async error'))
  }
}

module.exports = AsyncObjectWithAssertedErrorInCallback

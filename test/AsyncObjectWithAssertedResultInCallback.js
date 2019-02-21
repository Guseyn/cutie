'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class AsyncObjectWithAssertedResultInCallback extends AsyncObject {
  constructor () {
    super()
  }

  asyncCall () {
    return (callback) => {
      return callback(null, 'result')
    }
  }

  onResult (result) {
    assert.strictEqual(result, 'result')
    return result
  }
}

module.exports = AsyncObjectWithAssertedResultInCallback

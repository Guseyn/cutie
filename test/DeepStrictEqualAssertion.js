'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class DeepStrictEqualAssertion extends AsyncObject {
  constructor (actual, expected) {
    super(actual, expected)
  }

  syncCall () {
    return (actual, expected) => {
      assert.deepStrictEqual(actual, expected)
      return actual
    }
  }
}

module.exports = DeepStrictEqualAssertion

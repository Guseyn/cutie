'use strict'

const AsyncObject = require('./../src/AsyncObject')
const assert = require('assert')

class StrictEqualAssertion extends AsyncObject {
  constructor (actual, expected) {
    super(actual, expected)
  }

  syncCall () {
    return (actual, expected) => {
      assert.strictEqual(actual, expected)
      return actual
    }
  }
}

module.exports = StrictEqualAssertion

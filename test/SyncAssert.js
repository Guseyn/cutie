'use strict'

const AsyncObject = require('./../src/AsyncObject');
const assert = require('assert');

class AsyncAssert extends AsyncObject {

  constructor(actual, expected) {
    super(actual, expected);
  }

  definedSyncCall() {
    return (actual, expected) => {
      assert.strictEqual(actual, expected);
      return actual;
    }
  }

}

module.exports = AsyncAssert;

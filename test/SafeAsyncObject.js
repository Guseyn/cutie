'use strict'

const AsyncObject = require('./../src/AsyncObject')

class SafeAsyncObject extends AsyncObject {
  constructor () {
    super()
  }

  definedSyncCall () {
    return () => {
      throw new Error('safe error')
    }
  }

  continueAfterFail () {
    return true
  }
}

module.exports = SafeAsyncObject

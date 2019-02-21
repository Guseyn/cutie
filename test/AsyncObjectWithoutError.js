'use strict'

const AsyncObject = require('./../src/AsyncObject')

class AsyncObjectWithoutError extends AsyncObject {
  constructor () {
    super()
  }

  asyncCall () {
    return (callback) => {
      callback('value')
    }
  }

  callbackWithError () {
    return false
  }
}

module.exports = AsyncObjectWithoutError

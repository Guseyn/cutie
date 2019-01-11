'use strict'

const AsyncObject = require('./../src/AsyncObject')

class BrokenAsyncObject extends AsyncObject {
  constructor () {
    super()
  }
}

module.exports = BrokenAsyncObject

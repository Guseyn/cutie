'use strict'

const AsyncObject = require('./../src/AsyncObject')

class AsyncObjectWithArgs extends AsyncObject {
  constructor (...args) {
    super(...args)
  }

  asyncCall () {
    return (...args) => {
      let callback = args[args.length - 1]
      return callback(null, ...args.slice(0, args.length - 1))
    }
  }
}

module.exports = AsyncObjectWithArgs

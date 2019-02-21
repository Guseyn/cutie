'use strict'

const AsyncObject = require('./../src/AsyncObject')

class InvokedEvent extends AsyncObject {
  constructor (event) {
    super(event)
  }

  syncCall () {
    return (event) => {
      event()
      return event
    }
  }
}

module.exports = InvokedEvent

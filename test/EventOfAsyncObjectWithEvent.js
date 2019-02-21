'use strict'

const AsyncObject = require('./../src/AsyncObject')

class EventOfAsyncObjectWithEvent extends AsyncObject {
  constructor (event) {
    super(event)
  }

  syncCall () {
    return (event) => {
      return event
    }
  }
}

module.exports = EventOfAsyncObjectWithEvent

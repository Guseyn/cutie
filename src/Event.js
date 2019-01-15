'use strict'

class Event {
  constructor () {}

  // TO BE OVERRIDDEN

  definedBody (...args) {
    throw new Error(`Method definedBody must be overriden with arguments ${args} of the event/eventListener you call`)
  }
}

module.exports = Event

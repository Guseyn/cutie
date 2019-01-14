'use strict'

const Event = require('./../src/Event')

class BrokenEvent extends Event {
  constructor () {
    super()
  }
}

module.exports = BrokenEvent

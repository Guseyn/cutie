'use strict'

class Event {

  constructor() {}

  /*
    To be overriden
  */
  definedBody(...args) {
    this.throwError();
  }

  throwError() {
    throw new Error('Method definedBody must be overriden with arguments of the event/eventListener you call');
  }

}

module.exports = Event;

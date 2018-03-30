'use strict'

class Event {

  constructor() {}

  /*
    To be overriden
  */
  definedBody(...args) {
    this.throwError();
  }

  /*
    API
  */
  listen() {
    return (...args) => {
      this.definedBody(...args);
    }
  }

  throwError() {
    throw new Error('Method definedBody must be overriden with arguments of the event/eventListener you call');
  }

}

module.exports = Event;

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
      let body = this.definedBody(...args);
      try {
        this.definedBody(...args).call();
      } catch(err) {
        this.throwError();
      }
    }
  }

  throwError() {
    throw new Error('You must override method definedBody with arguments of the event/eventListener you call that return AsyncObject with defined sync/async call');
  }

}

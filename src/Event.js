'use strict'

const AsyncObject = require('./AsyncObject');

class Event {

  constructor() {}

  /*
    To be overriden
  */
  definedBody(...args) {
    return AsyncObject(...args);
  }

  /*
    API
  */
  listen() {
    return (...args) => {
      try {
        this.definedBody(...args).call();
      } catch(err) {
        throw new Error('you must define body of the event as AsyncObject with defined async/sync call');
      }
    }
  }

}

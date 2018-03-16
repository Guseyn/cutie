'use strict'

const AsyncObject = require('./../src/AsyncObject');

class AsyncMaxNum extends AsyncObject {

  constructor(a, b, c) {
    super(a, b, c);
  }

  /** 
   it's not an operation with I/O, it's just silly example
  **/
  definedAsyncCall() {
    return (a, b, c, callback) => {
      callback(Math.max(a, b, c));
    }
  }

  callbackWithError() {
    return false;
  }

}

module.exports = AsyncMaxNum;

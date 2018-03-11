'use strict'

const AsyncObject = require('./../src/AsyncObject');

class SyncMaxNum extends AsyncObject {

  constructor(a, b, c) {
    super(a, b, c);
  }

  definedSyncCall() {
    return (a, b, c) => {
      return Math.max(a, b, c);
    }
  }

}

module.exports = SyncMaxNum;

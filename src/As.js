'use strict'

const AsyncObject = require('./AsyncObject');

class As extends AsyncObject {

  constructor(key) {
    super(key);
  }

  definedSyncCall() {
    return (key) => {
      let result = this.cache[key];
      if (!result) {
        throw new Error(`There is no value that is cached with key: ${key}`);
      }
      return result;
    }
  }

}

module.exports = (key) => {
  return new As(key);
};

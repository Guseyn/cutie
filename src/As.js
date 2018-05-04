'use strict'

const AsyncObject = require('./AsyncObject');

class As extends AsyncObject {

  constructor(...args) {
    super(...args);
    this.cache;
  }

  definedSyncCall() {
    return (...args) => {
      let key;
      let value;
      let result;
      if (args.length === 2) {
        value = args[0];
        key = args[1];
        this.cache[key] = value;
        result = this.cache[key];
      } else if (args.length === 1) {
        key = args[0];
        result = this.cache[key];
      } else {
        throw new Error('As can have only one or two arguments');
      }
      return result;
    }
  }

  withCache(cacheObj) {
    this.cache = cacheObj;
    return this;
  }

}

module.exports = As;

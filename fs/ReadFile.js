'use strict'

const AsyncObject = require('./../async/AsyncObject');
const fs = require('fs');

class ReadFile extends AsyncObject {

  constructor(path) {
    super(path);
  }

  definedAsyncCall() {
    return fs.readFile;
  }

}

module.exports = ReadFile;

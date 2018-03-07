'use strict'

const AsyncObject = require('./../async/AsyncObject');
const fs = require('fs');

class WrittenFile extends AsyncObject {

  constructor(path, content) {
    super(path, content);
  }

  definedAsyncCall() {
    return fs.writeFile;
  }

}

module.exports = WrittenFile;

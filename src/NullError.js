'use strcit'

class NullError extends Error {

  constructor() {
    super('It is a null error');
    this.isNull = true;
  }

}

module.exports = NullError;

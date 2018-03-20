'use strict'

const AsyncTree = require('./AsyncTree');

class AsyncObject {

  /**
    args: any type (including AsyncObject)
  **/
  constructor(...args) {
    this.args = args;
  }

  /****** To be overriden ******/

  definedAsyncCall() {
    throw new Error(`asyncCall or syncCall must be defined`);
  }

  definedSyncCall() {
    throw new Error(`asyncCall or syncCall must be defined`);
  }

  callbackWithError() {
    return true;
  }

  onError(error) {
    throw error;
  }

  onResult(result) {
    return result;
  }

  /*****************************/

  /************ API ************/

  call() {
    new AsyncTree(this).create().call();
  }

  /*****************************/

  iterateArgs(func) {
    this.args.forEach((arg, index) => {
      let isArgAsync = arg instanceof AsyncObject;
      func(arg, index, isArgAsync);
    });
  }

  attachAllEventsTo(staticObject) {
    this.events.forEach(event => {
      event.attachTo(staticObject);
    });
  }

  hasNoArgs() {
    return this.args.length === 0;
  }

  readyToBeInvoked(readyResultsNum) {
    return this.args.length === readyResultsNum;
  }

}

module.exports = AsyncObject;

'use strict'

const AsyncTree = require('./AsyncTree');
const Event = require('./Event');

/* abstract class */

class AsyncObject {

  /*
    args: any type (including AsyncObject)
  */
  constructor(...args) {
    this.args = args;
    this.tree = new AsyncTree(this);
  }

  // TO BE OVERRIDDEN

    definedAsyncCall() {
      throw new Error('asyncCall or syncCall must be defined');
    }

    definedSyncCall() {
      throw new Error('asyncCall or syncCall must be defined');
    }

    onError(error) {
      throw error;
    }

    onResult(result) {
      return result;
    }

    callbackWithError() {
      return true;
    }

    continueAfterFail() {
      return false;
    }

  // PUBLIC API

    call() {
      this.tree.create().call();
    }

    // NOT ALLOWED TO BE OVERRIDDEN

      iterateArgs(func) {
        this.args.forEach((arg, index) => {
          let isAsync = arg instanceof AsyncObject;
          let isEvent = arg instanceof Event;
          func(arg, index, isAsync, isEvent);
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

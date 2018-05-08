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

    /* 
      Undefined behavior by default.
      Works only if this.continueAfterFail returns true
        (in that case onError and onResult will be ignored),
      Returns represented result(or error, or combination of them)
        of this async object.
    */
    onErrorAndResult(error, result) {
      return result;
    }
    
    /* 
      If it returns true, then this.onError and this.onResult will be ignored, 
      and the represented result of this object
        will be returned by this.onErrorAndResult.
    */
    continueAfterFail() {
      return false;
    }

    callbackWithError() {
      return true;
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

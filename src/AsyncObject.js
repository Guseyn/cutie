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
    this.next;
    this.cache = {};
    this.asKey;
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
      Works only if this.continueAfterFail returns true
        (in that case this.onError and this.onResult will be ignored),
    */
    onErrorAndResult(error, result) {
      return error || result;
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
      this.propagateCache(this);
      new AsyncTree(this).create().call();
    }

    after(asyncObject) {
      this.next = asyncObject;
      return this;
    }

    as(key) {
      this.asKey = key;
      return this;
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

      callNextTreeIfExists() {
        if (this.next) {
          this.propagateCache(this.next);
          new AsyncTree(this.next).create().call();
        }
      }

      propagateCache(arg) {
        if (arg instanceof AsyncObject) {
          arg.withCache(this.cache);
          arg.iterateArgs(
            arg => this.propagateCache(arg)
          );
        }
      }

      withCache(cache) {
        this.cache = cache;
        return this;
      }

      saveValueIntoCacheIfNeeded(value) {
        if (this.asKey) {
          this.cache[this.asKey] = value;
        }
        return this;
      }

}

module.exports = AsyncObject;

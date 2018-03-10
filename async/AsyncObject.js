'use strict'

const AsyncTree = require('./AsyncTree');
const TreeNode = require('./TreeNode');
const AsyncTreeNode = require('./AsyncTreeNode');
const NotDefinedAsyncTreeNode = require('./NotDefinedAsyncTreeNode');

class AsyncObject {

  /**
    args: any type (including AsyncObject)
  **/
  constructor(...args) {
    this.args = args;
  }

  /****** To be overriden ******/

  definedAsyncCall() {
    return () => {};
  }

  onError(error) {
    throw error;
  }

  onResult(result) {
    return result;
  }

  /*****************************/

  call() {
    let nodes = [];
    new AsyncTree(this).create().call();
  }

  iterateArgs(func) {
    this.args.forEach((arg, index) => {
      func(arg, index, arg instanceof AsyncObject);
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

'use strict'

const TreeNode = require('./TreeNode');
const AsyncTreeNode = require('./AsyncTreeNode');
const NotDefinedAsyncTreeNode = require('./NotDefinedAsyncTreeNode');

class AsyncObject {

  constructor(...args) {
    this.args = args;
  }

  // it needs to be overridden
  definedAsyncCall() {
    return () => {};
  }

  // it can be overridden
  onError(error) {
    throw error;
  }

  /* 
    it can be overridden,
      must return the processed result 
  */
  onResult(result) {
    // no async calls here, just process the result
    return result;
  }

  // api alias (for async tree root only)
  call() {
    let nodes = [];
    this.buildAsyncTreeNode(new NotDefinedAsyncTreeNode(), nodes, 0);
    /*
      leaf can be either simple argument or
        just AsyncObject without any arguments 
    */
    let leaves = nodes.filter(node => {
      return node.isLeave();
    });
    leaves.forEach(node => {
      node.call();
    });
  }

  buildAsyncTreeNode(parent, nodes, index) {
    let asyncTreeNode = new AsyncTreeNode(this, parent, index);
    nodes.push(asyncTreeNode);
    this.args.forEach((arg, index) => {
      if (arg instanceof AsyncObject) {
        arg.buildAsyncTreeNode(asyncTreeNode, nodes, index);
      } else {
        this.buildTreeNode(arg, asyncTreeNode, nodes, index);
      }
    });
  }

  buildTreeNode(arg, parent, nodes, index) {
    let treeNode = new TreeNode(arg, parent, index);
    nodes.push(treeNode);
  }

  hasNoArgs() {
    return this.args.length === 0;
  }

  readyToBeInvoked(readyResultsNum) {
    return this.args.length === readyResultsNum;
  }

}

module.exports = AsyncObject;

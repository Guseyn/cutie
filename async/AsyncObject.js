'use strict'

const AsyncTreeNode = require('./AsyncTreeNode');
const NotDefinedAsyncTreeNode = require('./NotDefinedAsyncTreeNode');

class AsyncObject {

  constructor(...args) {
    this.args = args;
  }

  // need to be overridden
  definedAsyncCall() {
    return () => {};
  }

  asyncArgsNum() {
    return this.args.filter(a => {
      return a instanceof AsyncObject;
    }).length;
  }

  readyToBeInvoked(readyResultsNum) {
    return this.args.length === readyResultsNum;
  }

  // api alias (for async tree root only)
  call() {
    let nodes = [];
    this.buildAsyncTreeNodes(new NotDefinedAsyncTreeNode(), nodes, 0);
    let leaves = nodes.filter(node => {
      return node.asyncArgsNum() == 0;
    });
    leaves.forEach(node => {
      node.call();
    });
    //console.log(leaves.length);
  }

  buildAsyncTreeNodes(parent, nodes, index) {
    let asyncTreeNode = new AsyncTreeNode(this, parent, index);
    nodes.push(asyncTreeNode);
    this.args.forEach((arg, index) => {
      arg.buildAsyncTreeNodes(asyncTreeNode, nodes, index);
    });
  }

}

module.exports = AsyncObject;

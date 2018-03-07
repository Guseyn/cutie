'use strict'

const TreeNode = require('./TreeNode');
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

  isAsyncArg(arg) {
  	return arg instanceof AsyncObject;
  }

  asyncArgsNum() {
    return this.args.filter(arg => {
      return this.isAsyncArg(arg);
    }).length;
  }

  readyToBeInvoked(readyResultsNum) {
    return this.args.length === readyResultsNum;
  }

  // api alias (for async tree root only)
  call() {
    let nodes = [];
    this.buildAsyncTreeNode(new NotDefinedAsyncTreeNode(), nodes, 0);
    let leaves = nodes.filter(node => {
      return node.isAsync() && node.asyncArgsNum() == 0;
    });
    leaves.forEach(node => {
      node.call();
    });
  }

  buildAsyncTreeNode(parent, nodes, index) {
    let asyncTreeNode = new AsyncTreeNode(this, parent, index);
    nodes.push(asyncTreeNode);
    this.args.forEach((arg, index) => {
    	if (this.isAsyncArg(arg)) {
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

}

module.exports = AsyncObject;

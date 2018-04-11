'use strict'

const TreeNode = require('./TreeNode');
const AsyncTreeNode = require('./AsyncTreeNode');
const NotDefinedAsyncTreeNode = require('./NotDefinedAsyncTreeNode');

class AsyncTree {

  /*
    rootField: AsyncObject
  */
  constructor(rootField) {
    this.rootField = rootField;
    this.nodes = [];
  }

  create() {
    this.createAsyncTreeNode(this.rootField, new NotDefinedAsyncTreeNode(), 0);
    return this;
  }

  call() {
    let leaves = this.nodes.filter(node => {
      return node.isLeaf();
    });
    leaves.forEach(leaf => {
      leaf.call();
    });
  }

  createAsyncTreeNode(field, parent, index) {

    let asyncTreeNode = new AsyncTreeNode(field, parent, index);
    this.nodes.push(asyncTreeNode);

    field.iterateArgs((arg, index, isAsync, isEvent) => {

      if (isEvent) {
        this.createTreeNode((...args) => {
          arg.definedBody(...args);
        }, asyncTreeNode, index);
      } else if (isAsync) {
        this.createAsyncTreeNode(arg, asyncTreeNode, index);
      } else {
        this.createTreeNode(arg, asyncTreeNode, index);
      }

    });

  }

  createTreeNode(field, parent, index) {
    let treeNode = new TreeNode(field, parent, index);
    this.nodes.push(treeNode);
  }

}

module.exports = AsyncTree;

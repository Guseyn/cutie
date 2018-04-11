'use strict'

const BasicTreeNode = require('./BasicTreeNode');
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

      if (isAsync) {
        this.createAsyncTreeNode(arg, asyncTreeNode, index);
      } else if (isEvent) {
        this.createBasicTreeNode((...args) => {
          arg.definedBody(...args);
        }, asyncTreeNode, index);
      } else {
        this.createBasicTreeNode(arg, asyncTreeNode, index);
      }

    });

  }

  createBasicTreeNode(field, parent, index) {
    let treeNode = new BasicTreeNode(field, parent, index);
    this.nodes.push(treeNode);
  }

}

module.exports = AsyncTree;

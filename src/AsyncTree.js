'use strict'

const Leaf = require('./Leaf');
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

  // PUBLIC

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

  // PRIVATE
  
    createAsyncTreeNode(field, parent, index) {
      let asyncTreeNode = new AsyncTreeNode(field, parent, index);
      this.nodes.push(asyncTreeNode);
      this.createChildNodes(field, asyncTreeNode);
    }
  
    createChildNodes(field, parent) {
      field.iterateArgs((argAsField, index, isAsync, isEvent) => {
        if (isAsync) {
          this.createAsyncTreeNode(argAsField, parent, index);
        } else if (isEvent) {
          this.createLeaf((...eventArgs) => {
            argAsField.definedBody(...eventArgs);
          }, parent, index);
        } else {
          this.createLeaf(argAsField, parent, index);
       }
      });
    }

    createLeaf(field, parent, index) {
      let treeNode = new Leaf(field, parent, index);
      this.nodes.push(treeNode);
    }

}

module.exports = AsyncTree;

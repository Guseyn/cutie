'use strict'

const TreeNode = require('./TreeNode');

class AsyncTreeNode extends TreeNode {

  /** 
    field: AsyncObject
    parent: AsyncTreeNode
    position: int
  **/
  constructor(field, parent, position) {
    super(field, parent, position);
    this.argResults = [];
  }

  call() {
    let args = this.argResults;
    this.field.definedAsyncCall()(...args, (err, result) => {
      if (err != null) {
        throw err;
      }
      this.parent.insertArgumentResult(this.position, result);
      this.callParent();
    });
  }

  asyncArgsNum() {
    return this.field.asyncArgsNum();
  }

  insertArgumentResult(position, result) {
    this.argResults[position] = result;
  }

  readyToBeInvoked() {
    let readyResultsNum = this.argResults.filter(arg => {
      return arg;
    }).length
    return this.field.readyToBeInvoked(readyResultsNum);
  }

  isAsync() {
    return true;
  }

}

module.exports = AsyncTreeNode;

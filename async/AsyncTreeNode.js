'use strict'

const TreeNode = require('./TreeNode');

class AsyncTreeNode extends TreeNode {

  /** 
    field: AsyncObject
    parent: AsyncTreeNode or NotDefinedAsyncTree
    position: int
  **/
  constructor(field, parent, position) {
    super(field, parent, position);
    this.argResults = [];
  }

  call() {

    let args = this.argResults;
    let asyncCall = this.field.definedAsyncCall();
    let syncCall = this.field.definedSyncCall();
    
    if (asyncCall != null && syncCall != null) {
      throw new Error(`It's not allowed to define both asyncCall and syncCall`);
    }
    
    if (asyncCall != null) {
    
      asyncCall(...args, (error, result) => {
        if (error != null) {
          this.field.onError(error);
        } else if (this.hasParent()) {
          super.call(this.field.onResult(result));
        }
      });
    
    } else if (syncCall != null) {
    
      let result = syncCall(...args);
      if (this.hasParent()) {
        super.call(this.field.onResult(result));
      }
    
    }
    
  }
  
  readyToBeInvoked() {
    let readyResultsNum = this.argResults.filter(arg => {
      return arg;
    }).length;
    return this.field.readyToBeInvoked(readyResultsNum);
  }

  isLeaf() {
    return this.field.hasNoArgs();
  }

  hasParent() {
    return this.parent instanceof AsyncTreeNode;
  }

  insertArgumentResult(position, result) {
    this.argResults[position] = result;
  }

}

module.exports = AsyncTreeNode;

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

    try {
      
      let asyncCall = this.field.definedAsyncCall();
      
      asyncCall(...args, (error, result) => {
        
        /**
          It's not possible to get rid of null here :(
        **/
        if (error != null) {
          this.field.onError(error);
        } else if (this.hasParent()) {
          super.call(this.field.onResult(result));
        }
      });
    
    } catch(error) {

      let syncCall = this.field.definedSyncCall();
      
      try {
        
        let result = syncCall(...args);
        if (this.hasParent()) {
          super.call(this.field.onResult(result));
        }
      
      } catch (error) {

        this.field.onError(error);
      
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

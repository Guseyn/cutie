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
    this.readyResultsNum = 0;
  }

  call() {

    let args = this.argResults;

    try {
      
      let asyncCall = this.field.definedAsyncCall();
      let staticObject;

      if (this.field.callbackWithError()) {
        
        asyncCall(...args, (error, ...results) => {

          /**
            It's not possible to get rid of null here :(
          **/
          if (error != null) {
            this.field.onError(error);
          } else if (this.hasParent()) {
            super.call(this.field.onResult(...results));
          }

        });

      } else {

        asyncCall(...args, (...results) => {
          
          if (this.hasParent()) {
            super.call(this.field.onResult(...results));
          }

        });

      }
    
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
    return this.field.readyToBeInvoked(this.readyResultsNum);
  }

  isLeaf() {
    return this.field.hasNoArgs();
  }

  hasParent() {
    return this.parent instanceof AsyncTreeNode;
  }

  insertArgumentResult(position, result) {
    this.argResults[position] = result;
    this.readyResultsNum += 1;
  }

}

module.exports = AsyncTreeNode;

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
      let staticObject;

      if (this.field.callbackWithError()) {
        
        staticObject = asyncCall(...args, (error, ...results) => {

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

        staticObject = asyncCall(...args, (...results) => {
          
          if (this.hasParent()) {
            super.call(this.field.onResult(...results));
          }

        });

      }

      this.field.attachAllEventsTo(staticObject);
    
    } catch(error) {

      let syncCall = this.field.definedSyncCall();
      
      try {
        
        let result = syncCall(...args);

        this.field.attachAllEventsTo(result);
        
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

'use strict'

const TreeNode = require('./TreeNode');

class AsyncTreeNode extends TreeNode {

  /*
    field: AsyncObject
    parent: AsyncTreeNode or NotDefinedAsyncTree
    position: int
  */
  constructor(field, parent, position) {
    super(field, parent, position);
    this.argResults = [];
    this.readyResultsNum = 0;
  }

  // PUBLIC

    call() {
      let args = this.argResults;
      try {
        let asyncCall = this.field.definedAsyncCall();
        if (this.field.callbackWithError()) {
          this.invokeAsyncCallWithError(asyncCall, ...args);
        } else {
          this.invokeAsyncCallWithoutError(asyncCall, ...args);
        }
     } catch(error) {
        let syncCall = this.field.definedSyncCall();
        try {
          this.invokeSyncCall(syncCall, ...args);
        } catch (error) {
          this.field.onError(error);
        }
      }
    }

    isLeaf() {
      return this.field.hasNoArgs();
    }

    readyToBeInvoked() {
      return this.field.readyToBeInvoked(this.readyResultsNum);
    }

    hasParent() {
      return this.parent instanceof AsyncTreeNode;
    }

    insertArgumentResult(position, result) {
      this.argResults[position] = result;
      this.readyResultsNum += 1;
    }

  // PRIVATE
    
    invokeAsyncCallWithError(asyncCall, ...args) {
      asyncCall(...args, (error, ...results) => {
        // It's not possible to get rid of null here :(
        if (error != null) {
          this.field.onError(error);
        } else if (this.hasParent()) {
          super.callParent(this.field.onResult(...results));
        }
      });
    }

    invokeAsyncCallWithoutError(asyncCall, ...args) {
      asyncCall(...args, (...results) => {
        if (this.hasParent()) {
          super.callParent(this.field.onResult(...results));
        }
      });
    }

    invokeSyncCall(syncCall, ...args) {
      let result = syncCall(...args);
      if (this.hasParent()) {
        super.callParent(this.field.onResult(result));
      }
    }

}

module.exports = AsyncTreeNode;

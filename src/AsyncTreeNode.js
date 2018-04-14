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
        if (this.field.callbackWithError()) {
          this.invokeAsyncCallWithError(...args);
        } else {
          this.invokeAsyncCallWithoutError(...args);
        }
     } catch(error) {
      try {
          this.invokeSyncCall(...args);
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
    
    invokeAsyncCallWithError(...args) {
      this.field.definedAsyncCall(...args, (error, ...results) => {
        // It's not possible to get rid of null here :(
        if (error != null) {
          this.field.onError(error);
        } else if (this.hasParent()) {
          super.callParent(this.field.onResult(...results));
        }
      });
    }

    invokeAsyncCallWithoutError(...args) {
      this.field.definedAsyncCall(...args, (...results) => {
        if (this.hasParent()) {
          super.callParent(this.field.onResult(...results));
        }
      });
    }

    invokeSyncCall(...args) {
      let result = this.field.definedSyncCall(...args);
      if (this.hasParent()) {
        super.callParent(this.field.onResult(result));
      }
    }

}

module.exports = AsyncTreeNode;

'use strict'

const TreeNode = require('./TreeNode');
const NullError = require('./NullError');

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
        if (error.message !== 'asyncCall or syncCall must be defined') {
          this.field.onError(error);
        } else {
          let syncCall = this.field.definedSyncCall();
          this.invokeSyncCall(syncCall, ...args);
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
        if (!this.processedError(error, ...results)) {
          this.processedResult(...results);
        }
      });
    }

    invokeAsyncCallWithoutError(asyncCall, ...args) {
      asyncCall(...args, (...results) => {
        this.processedResult(...results);
      });
    }

    invokeSyncCall(syncCall, ...args) {
      try {
        let syncCallResult = syncCall(...args);
        this.processedResult(syncCallResult);
      } catch (error) {
        this.processedError(error);
      }
    }

    processedError(error, ...results) {
      let isProcessed = false;
      // It's not possible to get rid of null here :(
      if (error != null) {
        if (this.hasParent()) {
          if (this.field.continueAfterFail()) {
            super.callParent(this.field.onErrorAndResult(error, ...results));
          } else {
            this.field.onError(error);
          }
        } else {
          if (this.field.continueAfterFail()) {
            this.field.onErrorAndResult(error, ...results);
          } else {
            this.field.onError(error);
          }
        }
        isProcessed = true;
      }
      return isProcessed;
    }

    processedResult(...results) {
      if (this.hasParent()) {
        if (this.field.continueAfterFail()) {
          super.callParent(this.field.onErrorAndResult(new NullError(), ...results));
        } else {
          super.callParent(this.field.onResult(...results));
        }
      } else {
        if (this.field.continueAfterFail()) {
          this.field.onErrorAndResult(new NullError(), ...results);
        } else {
          this.field.onResult(...results);
        }
      }
      return true;
    }

}

module.exports = AsyncTreeNode;

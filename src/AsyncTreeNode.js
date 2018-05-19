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
            let totalResult = this.field.onErrorAndResult(error, ...results);
            this.field.saveValueIntoCacheIfNeeded(totalResult);
            super.callParent(totalResult);
          } else {
            this.field.onError(error);
          }
        } else {
          if (this.field.continueAfterFail()) {
            let totalResult = this.field.onErrorAndResult(error, ...results);
            this.field.saveValueIntoCacheIfNeeded(totalResult);
            this.field.callNextTreeIfExists();
          } else {
            this.field.onError(error);
          }
        }
        isProcessed = true;
      }
      return isProcessed;
    }

    processedResult(...results) {
      let totalResult;
      if (this.hasParent()) {
        if (this.field.continueAfterFail()) {
          totalResult = this.field.onErrorAndResult(new NullError(), ...results);
        } else {
          totalResult = this.field.onResult(...results);
        }
        this.field.saveValueIntoCacheIfNeeded(totalResult);
        super.callParent(totalResult);
      } else {
        if (this.field.continueAfterFail()) {
          totalResult = this.field.onErrorAndResult(new NullError(), ...results);
        } else {
          totalResult = this.field.onResult(...results);
        }
        this.field.saveValueIntoCacheIfNeeded(totalResult);
        this.field.callNextTreeIfExists();
      }
      return true;
    }

}

module.exports = AsyncTreeNode;

'use strict'

const AsyncObject = require('./AsyncObject');
const As = require('./As');

class Cache extends AsyncObject {

  constructor(...args) {
    super(...args);
    this.cacheObj = {};
    this.args.forEach(arg => this.attachCacheToAsObjects(arg));
    this.nextTree;
  }

  definedSyncCall() {
    return (...args) => {
      if (this.nextTree) {
        this.nextTree.call();
      }
      return this.cacheObj;
    }
  }

  // PUBLIC

  forTree(tree) {
    this.nextTree = tree;
    this.nextTree.iterateArgs(
      arg => this.iterateCacheAttachments(arg)
    );
    return this;
  }

  // PRIVATE
  
  attachCacheToAsObjects(arg) {
    if (arg instanceof As) {
      arg = arg.withCache(this.cacheObj);
    }
    if (arg instanceof AsyncObject) {
      arg.iterateArgs(
        arg => this.iterateCacheAttachments(arg)
      );
    }
  }

  iterateCacheAttachments(arg) {
    this.attachCacheToAsObjects(arg);
  }

}

module.exports = Cache;

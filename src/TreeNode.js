'use strict'

const Event = require('./Event');

class TreeNode {

  /*
    field: just some value (argument), also can be Event
    parent: AsyncTreeNode
    position: int
  */
  constructor(field, parent, position) {
    this.field = field;
    this.parent = parent;
    this.position = position;
  }

  call(result) {
    this.parent.insertArgumentResult(this.position, result || this.field);
    if (this.parent.readyToBeInvoked()) {
      this.parent.call();
    }
  }

  isLeaf() {
    return true;
  }

}

module.exports = TreeNode;

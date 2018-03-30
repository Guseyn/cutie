'use strict'

class TreeNode {

  /** 
    field: just some value (argument), also can be Event
    parent: AsyncTreeNode
    position: int
  **/
  constructor(field, parent, position) {
    this.field = field;
    this.parent = parent;
    this.position = position;
  }

  call(result) {
    if (this.field instanceof Event) {
      this.parent.insertArgumentResult(
        this.position, (...args) => {
          this.field.definedBody(...args);
        }
      );
    } else {
      this.parent.insertArgumentResult(this.position, result || this.field);
      if (this.parent.readyToBeInvoked()) {
        this.parent.call();
      }
    }
  }

  isLeaf() {
    return true;
  }

}

module.exports = TreeNode;

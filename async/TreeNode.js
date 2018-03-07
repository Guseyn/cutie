'use strict'

class TreeNode {

	/** 
		field: just some value (argument)
		parent: AsyncTreeNode
		position: int
	**/
	constructor(field, parent, position) {
		this.field = field;
		this.parent = parent;
    this.position = position;
	}

	call() {
    this.parent.insertArgumentResult(this.position, field);
    this.callParent();
	}

  callParent() {
  	if (this.parent.readyToBeInvoked()) {
  		this.parent.call();
  	}
  }

  isAsync() {
    return false;
  }

}

module.exports = TreeNode;

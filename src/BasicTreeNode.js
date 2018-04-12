'use strict'

const TreeNode = require('./TreeNode');

class BasicTreeNode extends TreeNode {

  constructor(field, parent, position) {
    super(field, parent, position);
  }

  // PUBLIC

    call(result) {
      super.callParent(result);
    }

    isLeaf() {
      return true;
    }

}

module.exports = BasicTreeNode;

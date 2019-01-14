'use strict'

const TreeNode = require('./../src/TreeNode')

class BrokenTreeNode extends TreeNode {
  /*
    field: simple argument (not AsyncObject, can be Event)
    parent: AsyncTreeNode or NotDefinedAsyncTree
    position: int
  */
  constructor (field, parent, position) {
    super(field, parent, position)
  }
}

module.exports = BrokenTreeNode

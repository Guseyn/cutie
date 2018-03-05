'use strict'

class AsyncTreeNode {

	constructor(field, parent, position) {
		this.field = field;
		this.parent = parent;
		this.position = position;
	}

	asyncArgsNum() {
		return this.field.asyncArgsNum();
	}

}

module.exports = AsyncTreeNode;

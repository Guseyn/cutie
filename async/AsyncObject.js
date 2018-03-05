'use strict'

const AsyncTreeNode = require('./AsyncTreeNode');

class AsyncObject {

	constructor(...args) {
		this.args = args;
	}

	asyncArgsNum() {
		return this.args.filter(a => {
			return a instanceof AsyncObject;
		}).length;
	}

	call() {
		let nodes = [];
		this.buildAsyncTreeNodes(this, nodes, 0);
		let leaves = nodes.filter(node => {
			return node.asyncArgsNum() == 0;
		});
	}

	buildAsyncTreeNodes(parent, nodes, index) {
		nodes.push(new AsyncTreeNode(this, parent, index));
		this.args.forEach((arg, index) => {
			arg.buildAsyncTreeNodes(this, nodes, index);
		});
	}

	// need to be override
	definedAsyncCall() {
		return () => {};
	}

}

new AsyncObject(
	new AsyncObject(),
	new AsyncObject(
		new AsyncObject(
			new AsyncObject(), new AsyncObject()
		)
	),
	new AsyncObject()
).call();

'use strict'

const AsyncObject = require('./AsyncObject');

class AsyncTreeNode {

	/** 
		field: AsyncObject or just field
		parent: AsyncTreeNode
		position: int
	**/
	constructor(field, parent, position) {
		this.field = field;
		this.parent = parent;
    this.position = position;
		this.argResults = [];
	}

	isAsync() {
		return this.field instanceof AsyncObject;
	}
  
  asyncArgsNum() {
  	if (this.isAsync()) {
  		return this.field.asyncArgsNum();
  	}
  	return 0;
  }

	insertArgumentResult(position, result) {
    this.argResults[position] = result;
  }

	call() {
		if (this.isAsync()) {
      let args = this.argResults;
      this.field.definedAsyncCall()(...args, (err, result) => {
        if (err != null) {
          throw err;
        }
        this.parent.insertArgumentResult(this.position, result);
        this.callParent(parent);
      });
    } else {
      this.parent.insertArgumentResult(this.position, field);
      this.callParent(parent);
    }
	}

	readyToBeInvoked() {
		if (this.isAsync()) {
			return this.field.readyToBeInvoked(
				this.argResults.filter(arg => {
					return arg;
				}).length
			);
		}
		return false;
  }

  callParent(parent) {
  	if (this.parent.readyToBeInvoked()) {
  		this.parent.call();
  	}
  }

}

module.exports = AsyncTreeNode;

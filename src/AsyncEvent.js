'use strict'

class AsyncEvent {

	constructor(name, callback) {
		this.name = name;
		this.callback = callback;
	}

	attachTo(staticObject) {
		staticObject.on(this.name, this.callback);
	}

}

module.exports = AsyncEvent;

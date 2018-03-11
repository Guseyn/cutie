'use strict'

const AsyncObject = require('./../async/AsyncObject');

class AsyncAssert extends AsyncObject {

	constructor(actual, expected) {
		super(actual, expected);
	}

	definedSyncCall() {
		return (actual, expected) => {
			assrt(actual, expected);
			return actual;
		}
	}

}

module.exports = AsyncAssert;

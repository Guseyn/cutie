'use strict';

const AsyncObject = require('./../async/AsyncObject');
const AsyncTree = require('./../async/AsyncTree');

const assert = require('assert');

class MaxNum extends AsyncObject {

	constructor(a, b, c) {
    super(a, b, c);
  }

	definedAsyncCall() {
		return (a, b, c, callback) => {
			callback(null, Math.max(a, b, c));
		}
	}

}

class TestMaxNum extends AsyncObject {
		
		constructor(actual, expected) {
    	super(actual, expected);
  	}

  	definedSyncCall() {
			return (actual, expected) => {
				console.log(actual);
				assert.strictEqual(actual, expected);
				return actual;
			}
		}

}

let testAsyncObject = new TestMaxNum(

	new MaxNum(1,2,8), new MaxNum(3,4,8)

);

testAsyncObject.call();

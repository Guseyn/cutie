'use strict'

const assert = require('assert')
const AsyncObject = require('./../src/AsyncObject')
const Event = require('./../src/Event')
const as = require('./../src/As')
const StrictEqualAssertion = require('./StrictEqualAssertion')
const DeepStrictEqualAssertion = require('./DeepStrictEqualAssertion')
const AsyncMaxNum = require('./AsyncMaxNum')
const SyncMaxNum = require('./AsyncMaxNum')
const BrokenAsyncObject = require('./BrokenAsyncObject')
const SafeAsyncObject = require('./SafeAsyncObject')
const AsyncObjectWithoutError = require('./AsyncObjectWithoutError')
const EventOfAsyncObjectWithEvent = require('./EventOfAsyncObjectWithEvent')
const BrokenEvent = require('./BrokenEvent')
const InvokedEvent = require('./InvokedEvent')
const BrokenTreeNode = require('./BrokenTreeNode')
const AsyncObjectWithArgs = require('./AsyncObjectWithArgs')
const AsyncObjectWithAssertedErrorInCallback = require('./AsyncObjectWithAssertedErrorInCallback')
const AsyncObjectWithAssertedSafeErrorInCallback = require('./AsyncObjectWithAssertedSafeErrorInCallback')
const AsyncObjectWithAssertedErrorInDefinedCall = require('./AsyncObjectWithAssertedErrorInDefinedCall')
const AsyncObjectWithAssertedSafeErrorInDefinedCall = require('./AsyncObjectWithAssertedSafeErrorInDefinedCall')
const AsyncObjectWithAssertedResultInCallback = require('./AsyncObjectWithAssertedResultInCallback')
const AsyncObjectWithAssertedSafeResultInCallback = require('./AsyncObjectWithAssertedSafeResultInCallback')
const AsyncObjectWithAssertedSafeErrorAndResultInCallback = require('./AsyncObjectWithAssertedSafeErrorAndResultInCallback')

let testAsyncObject =
  new AsyncMaxNum(
    new AsyncMaxNum(1, 3,
      new AsyncMaxNum(1, 2, 4).as('max1')
    ).as('max2'),
    new AsyncMaxNum(2,
      new SyncMaxNum(3, 4,
        new SyncMaxNum(5, 4, 6).as('max3')
      ).as('max4'), 1
    ).as('max5'),
    new SyncMaxNum(1, 2, 8).as('max6')
  ).as('max7')
    .after(
      new StrictEqualAssertion(
        new StrictEqualAssertion(
          new AsyncMaxNum(
            as('max1'),
            new AsyncMaxNum(
              new SyncMaxNum(
                3, as('max2'), as('max3')
              ), 4, as('max4')
            ),
            new AsyncMaxNum(4,
              new SyncMaxNum(as('max5'), 4,
                new AsyncMaxNum(4, 6, 2)
              ), as('max6')
            )
          ),
          new AsyncMaxNum(3, 4, 8)
        ),
        new AsyncMaxNum(1, 4, 8).as('max7')
      ).after(
        new StrictEqualAssertion(8, as('max7'))
      )
    )

testAsyncObject.call()

let testAsyncObjectWithFailedAs =
  new StrictEqualAssertion(
    new AsyncMaxNum(1, 2, as('max'))
  )

// we can do it, because here AsyncMaxNum does not work with I/O
try {
  testAsyncObjectWithFailedAs.call()
} catch (err) {
  assert.deepStrictEqual(err, new Error('There is no value that is cached with key: max'))
}

let testAsyncObjectWithoutDefinedCall =
  new BrokenAsyncObject()

try {
  testAsyncObjectWithoutDefinedCall.call()
} catch (err) {
  assert.deepStrictEqual(err, new Error('asyncCall or syncCall must be defined'))
}

let testAsyncObjectWithSafeError =
  new DeepStrictEqualAssertion(
    new SafeAsyncObject(),
    new Error('safe error')
  )

testAsyncObjectWithSafeError.call()

let testAsyncObjectWithoutError =
  new StrictEqualAssertion(
    new AsyncObjectWithoutError(), 'value'
  )

testAsyncObjectWithoutError.call()

let testAsyncObjectWithBrokenEvent =
  new InvokedEvent(
    new EventOfAsyncObjectWithEvent(
      new BrokenEvent()
    )
  )

try {
  testAsyncObjectWithBrokenEvent.call()
} catch (err) {
  assert.deepStrictEqual(err, new Error('Method body must be overriden with arguments  of the event/eventListener you call'))
}

let brokenTreeNode = new BrokenTreeNode()

try {
  brokenTreeNode.isLeaf()
} catch (err) {
  assert.deepStrictEqual(err, new Error('isLeaf must be overridden'))
}

try {
  brokenTreeNode.call()
} catch (err) {
  assert.deepStrictEqual(err, new Error('call must be overridden and insert result  into parent node'))
}

// just test safe error in callback
new AsyncObjectWithAssertedSafeErrorInCallback().call()

// test safe error in callback (with parent async tree node)
new AsyncObjectWithArgs(
  new AsyncObjectWithAssertedSafeErrorInCallback()
).call()

// just test error in callback
new AsyncObjectWithAssertedErrorInCallback().call()

// test error in callback (with parent async tree node)
new AsyncObjectWithArgs(
  new AsyncObjectWithAssertedErrorInCallback()
).call()

// just test error in definedCall
new AsyncObjectWithAssertedErrorInDefinedCall().call()

// test error in definedCall (with parent async tree node)
new AsyncObjectWithArgs(
  new AsyncObjectWithAssertedErrorInDefinedCall()
).call()

// just test safe error in definedCall
new AsyncObjectWithAssertedSafeErrorInDefinedCall().call()

// test safe error in definedCall (with parent async tree node)
new AsyncObjectWithArgs(
  new AsyncObjectWithAssertedSafeErrorInDefinedCall()
).call()

// just test result in callback
new AsyncObjectWithAssertedResultInCallback().call()

// test result in callback (with parent async tree node)
new AsyncObjectWithArgs(
  new AsyncObjectWithAssertedResultInCallback()
).call()

// just test safe result in callback
new AsyncObjectWithAssertedSafeResultInCallback().call()

// test safe result in callback (with parent async tree node)
new AsyncObjectWithArgs(
  new AsyncObjectWithAssertedSafeResultInCallback()
).call()

// just test safe error and safe result in callback
new AsyncObjectWithAssertedSafeErrorAndResultInCallback().call()

// test safe error and safe result in callback (with parent async tree node)
new AsyncObjectWithArgs(
  new AsyncObjectWithAssertedSafeErrorAndResultInCallback()
).call()

class A extends AsyncObject {}
class B extends A {}
class C extends B {}
class E extends Event {}
class D extends E {}
class F extends D {}
class N {}

assert(new A().isAsyncObject(new A()))
assert(new A().isAsyncObject(new B()))
assert(new A().isAsyncObject(new C()))
assert(!new A().isAsyncObject(new N()))
assert(new A().isEvent(new E()))
assert(new A().isEvent(new D()))
assert(new A().isEvent(new F()))
assert(!new A().isEvent(new N()))

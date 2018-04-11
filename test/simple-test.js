'use strict';

const SyncAssert = require('./SyncAssert');
const AsyncMaxNum = require('./AsyncMaxNum');
const SyncMaxNum = require('./AsyncMaxNum');

let testAsyncObject = new SyncAssert (new SyncAssert(

  new AsyncMaxNum(
    new AsyncMaxNum(1, 3, 4),
    new AsyncMaxNum(
      new SyncMaxNum(3, 1, 2), 4, 5
    ),
    new AsyncMaxNum(
      4, new SyncMaxNum(1, 4, 
        new AsyncMaxNum(4, 6, 2)
      ), 8
    )
  ),

  new AsyncMaxNum(
    3, 4, 8
  )

), 8);

testAsyncObject.call();

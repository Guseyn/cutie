'use strict';

const SyncAssert = require('./SyncAssert');
const AsyncMaxNum = require('./AsyncMaxNum');
const SyncMaxNum = require('./AsyncMaxNum');
const as = require('./../src/As');

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
      new SyncAssert(
        new SyncAssert(
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
        new SyncAssert(8, as('max7'))
      )
    );

testAsyncObject.call();

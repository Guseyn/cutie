'use strict';

const SyncAssert = require('./SyncAssert');
const AsyncMaxNum = require('./AsyncMaxNum');
const SyncMaxNum = require('./AsyncMaxNum');
const Cache = require('./../src/Cache');
const As = require('./../src/As');

let testAsyncObject = new Cache(
  new As(
    new AsyncMaxNum(
      new As(
        new AsyncMaxNum(1, 3, 
          new As(
            new AsyncMaxNum(1, 2, 4), 'max1'
          )
        ), 'max2'
      ),
      new As(
        new AsyncMaxNum(2,
          new As(
            new SyncMaxNum(3, 4,
              new As(
                new SyncMaxNum(5, 4, 6), 'max3'
              )
            ), 'max4'
          ), 1), 'max5'
      ),
      new As(8, 'max6')
    ), 'max7'
  )
).forTree(
  new SyncAssert(
    new SyncAssert(
      new AsyncMaxNum(
        new As('max1'),
        new AsyncMaxNum(
          new SyncMaxNum(
            3, new As('max2'), new As('max3')
          ), 4, new As('max4')
        ),
        new AsyncMaxNum(4,
          new SyncMaxNum(new As('max5'), 4, 
            new AsyncMaxNum(4, 6, 2)
          ), new As('max6')
        )
      ),

      new AsyncMaxNum(3, 4, 8)
    ), new As('max7')
  )
);

testAsyncObject.call();

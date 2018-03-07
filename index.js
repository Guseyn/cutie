const AsyncObject = require('./async/AsyncObject');

new AsyncObject(
  new AsyncObject('arg1', 0),
  new AsyncObject(
    new AsyncObject(), 
    new AsyncObject(
      new AsyncObject('arg2', 1)
    )
  ),
  new AsyncObject(
    new AsyncObject(
      new AsyncObject(),
      new AsyncObject()
    )
  ),
  new AsyncObject(
    new AsyncObject(
      new AsyncObject()
    ),
    new AsyncObject(),
    new AsyncObject()
  )
).call();
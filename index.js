const AsyncObject = require('./async/AsyncObject');

new AsyncObject(
  new AsyncObject(),
  new AsyncObject(
    new AsyncObject(), 
    new AsyncObject(
      new AsyncObject()
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
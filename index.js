const AsyncObject = require('./async/AsyncObject');
const ReadFile = require('./fs/ReadFile');
const WrittenFile = require('./fs/WrittenFile');

  new WrittenFile(
    new ReadFile('./text1.txt'),
    new ReadFile(
      new ReadFile('./text2.txt')
    )
  ).call();

/*new AsyncObject(
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
).call();*/
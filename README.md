# Cutie
Cutie is a lightweight library without any external dependencies, the main point of which is just to provide user with abstractions that make asynchronous code in Node simple and declarative and that's it

# Motivation
Let's say we want to write content to a file that has been read from another one. And all these operations are asynchronous, of course. So, instead of writing something like this:
```js
fs.readFile('./../file1.txt', (err, result) => {
  if (err != null) {
    throw err;
  }
 
  fs.writeFile('/../file2.txt', result, (err) => {
    if (err != null) {
      throw err;
    }
  });
});
```
we can design our code in the following style:
```js
new WrittenFile(
  './../file2.txt',
  new ReadFile('./../file1.txt')
).call();
```
# How to use
You can use Cutie as dependency via npm:
<b>npm install @guseyn/cutie</b>
```js
const AsyncObject = require('@guseyn/cutie').AsyncObject;
const fs = require('fs');

class WrittenFile extends AsyncObject {

  constructor(path, content) {
    super(path, content);
  }
  
  definedAsyncCall() {
    return fs.writeFile;
  }
  
}
```
```js
const AsyncObject = require('@guseyn/cutie').AsyncObject;
const fs = require('fs');

class ReadFile extends AsyncObject {

  constructor(path) {
    super(path);
  }
  
  definedAsyncCall() {
    return fs.readFile;
  }

}
```
AsyncObject also provides methods OnResult and OnError, so that you can process the result from async call and handle an error in the specific way (error is being thrown by default).

Let's say we want to read a json file and parse all information from there. Cutie provides two ways. First of them is just to create <b>ReadJsonFile</b> async object like this:
```js
const AsyncObject = require('@guseyn/cutie').AsyncObject;
const fs = require('fs');

class ReadJsonFile extends AsyncObject {
  
  constructor(path) {
    super(path);
  }
  
  definedAsyncCall() {
    return fs.readFile;
  }
  
  onResult(result) {
    return JSON.parse(result);
  }

}

// usage
new ReadJsonFile('./../file.txt').call();
```
<b>ReadJsonFile</b> also could be designed like this:
```js
const fs = require('fs');
const ReadFile = require('./ReadFile');

class ReadJsonFile extends ReadFile {
  
  constructor(path) {
    super(path);
  }
  
  onResult(result) {
    return JSON.parse(result);
  }

}

// usage
new ReadJsonFile('./../file.txt').call();
```
Or you can use <b>ReadFile</b> with <b>ParsedJson</b> that looks like this:
```js
const AsyncObject = require('@guseyn/cutie').AsyncObject;
const fs = require('fs');
const ReadFile = require('./ReadFile');

class ParsedJson extends AsyncObject {

  constructor(text) {
    super(text);
  }
  
  /*
    you can't call here async operations with I/O
  */
  definedSyncCall() {
    return (text) => {
      return JSON.parse(text);
    }
  }

}

// usage
new ParsedJson(
  new ReadFile('./../file.txt')
).call();
```
[Learn more](http://guseyn.com/post-reconsidering-async-object-with-cutie#intro).

Also Cutie provides <b>Event</b> abstraction for event listeners in Node. [Read more](http://guseyn.com/post-event-new-abstraction-in-cutie#intro).


<img src="https://github.com/Guseyn/logos/raw/master/cutie.svg?sanitize=true">

[![NPM Version](https://img.shields.io/npm/v/@cuties/cutie.svg)](https://npmjs.org/package/@cuties/cutie)
[![Build Status](https://travis-ci.org/Guseyn/cutie.svg?branch=master)](https://travis-ci.org/Guseyn/cutie)
[![codecov](https://codecov.io/gh/Guseyn/cutie/branch/master/graph/badge.svg)](https://codecov.io/gh/Guseyn/cutie)

**Cutie** is a lightweight library that implements [Async Tree Pattern](https://guseyn.com/pdf/Async_Tree_Pattern.pdf).

# Motivation
Let's say we want to read content from a file and write it to another one. And all these operations are asynchronous, of course. So, instead of writing something like this:
```js
fs.readFile('./../file1.txt', 'utf8', (err, result) => {
  if (err != null) {
    throw err
  }
 
  fs.writeFile('./../file2.txt', result, (err) => {
    if (err != null) {
      throw err
    }
  })
})
```
we can design our code in the following style:
```js
new WrittenFile(
  './../file2.txt',
  new ReadDataByPath('./../file1.txt', 'utf8')
).call()
```
# How to use
You can use Cutie as a dependency via npm:
`npm install @cuties/cutie`
```js
const AsyncObject = require('@cuties/cutie').AsyncObject
const fs = require('fs')

// Represents file as path
class WrittenFile extends AsyncObject {
  constructor (path, content) {
    super(path, content)
  }
  
  asyncCall () {
    return (path, content, callback) => {
      this.path = path
      fs.writeFile(path, content, callback)
    }
  }

  onResult() {
    return this.path
  }
}
```
```js
const AsyncObject = require('@cuties/cutie').AsyncObject
const fs = require('fs')

// Represents buffer or string
class ReadDataByPath extends AsyncObject {
  constructor (path, encoding) {
    super(path, encoding);
  }
  
  asyncCall () {
    return fs.readFile
  }
}
```
AsyncObject also provides methods `OnResult` and `OnError`, so that you can process the result(it's provided by callback by default) from async call and handle an error in the specific way (error is being thrown by default).

Let's say we want to read a json file and parse all information from there. Cutie provides two ways. First of them is just to create `ParsedJSON` async object like this:
```js
const AsyncObject = require('@cuties/cutie').AsyncObject;
const fs = require('fs');

class ParsedJSON extends AsyncObject {
  constructor (path, encoding) {
    super(path, encoding)
  }
  
  asyncCall () {
    return fs.readFile
  }
  
  onResult (result) {
    return JSON.parse(result)
  }
}

// usage
new ParsedJSON('./../file.txt', 'utf8').call()
```
`ParsedJSON` also could be designed like this:
```js
const fs = require('fs')
const ReadDataByPath = require('./ReadDataByPath')

class ParsedJSON extends ReadDataByPath {
  constructor (path, encoding) {
    super(path, encoding)
  }
  
  onResult (result) {
    return JSON.parse(result)
  }
}

// usage
new ParsedJSON('./../file.txt', 'utf8').call();
```
Or you can use `ReadDataByPath` with `ParsedJSON` that looks like this:
```js
const AsyncObject = require('@cuties/cutie').AsyncObject
const fs = require('fs')
const ReadDataByPath = require('./ReadDataByPath')

class ParsedJSON extends AsyncObject {
  constructor (text) {
    super(text)
  }
  
  /*
    you can't call here async operations with I/O
  */
  syncCall () {
    return JSON.parse
  }
}

// usage
new ParsedJSON(
  new ReadDataByPath('./../file.txt', 'utf8')
).call()
```
## Read more

1. [Async Tree Pattern](https://guseyn.com/pdf/Async_Tree_Pattern.pdf)
2. [Async Objects instead of Async Calls](https://guseyn.com/posts/async-objects-instead-of-async-calls)

## Run test

`npm test`

## Run build

`npm run build`

## Libraries that use cutie

[node-test-executor](https://github.com/Guseyn/node-test-executor), [cutie-is](https://github.com/Guseyn/cutie-is), [cutie-assert](https://github.com/Guseyn/cutie-assert), [cutie-fs](https://github.com/Guseyn/cutie-fs), [cutie-http](https://github.com/Guseyn/cutie-http), [cutie-https](https://github.com/Guseyn/cutie-http), [cutie-rest](https://github.com/Guseyn/cutie-rest), [cutie-buffer](https://github.com/Guseyn/cutie-buffer), [cutie-error](https://github.com/Guseyn/cutie-error), [cutie-date](https://github.com/Guseyn/cutie-date), [cutie-json](https://github.com/Guseyn/cutie-json), [cutie-event](https://github.com/Guseyn/cutie-event), [cutie-stream](https://github.com/Guseyn/cutie-stream), [cutie-object](https://github.com/Guseyn/cutie-object), [cutie-process](https://github.com/Guseyn/cutie-process), [cutie-iterator](https://github.com/Guseyn/cutie-iterator), [cutie-path](https://github.com/Guseyn/cutie-path), [cutie-if-else](https://github.com/Guseyn/cutie-if-else), [cutie-cluster](https://github.com/Guseyn/cutie-cluster), [page-static-generator](https://github.com/Guseyn/page-static-generator) and many others.

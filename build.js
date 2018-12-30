'use strict'

const {
  ExecutedLint,
  ExecutedTestCoverage,
  ExecutedTestCoverageCheck,
  ExecutedTestCoverageReport
} = require('@cuties/wall')

new ExecutedLint(process, './src').after(
  new ExecutedLint(process, './test').after(
    new ExecutedTestCoverageCheck(
      new ExecutedTestCoverage(
        process, './test/simple-test.js'
      )
    ), { 'lines': 100, 'functions': 100, 'branches': 100 }
  )
).call()

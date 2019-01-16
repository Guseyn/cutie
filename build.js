'use strict'

const {
  ExecutedLint,
  ExecutedTestCoverage,
  ExecutedTestCoverageCheck,
  ExecutedTestCoverageReport,
  LoggedTotalCoverageByJsonSummary
} = require('@cuties/wall')
const {
  ReadDataByPath
} = require('@cuties/fs')
const {
  ParsedJSON
} = require('@cuties/json')

new ExecutedLint(process, './src').after(
  new ExecutedLint(process, './test').after(
    new ExecutedTestCoverageReport(
      new ExecutedTestCoverageCheck(
        new ExecutedTestCoverage(
          process, './test/test.js'
        ),
        { 'lines': 100, 'functions': 100, 'branches': 100 }
      ), 'json-summary'
    ).after(
      new LoggedTotalCoverageByJsonSummary(
        new ParsedJSON(
          new ReadDataByPath('coverage/coverage-summary.json', { encoding: 'utf8' })
        ), (linesPct, statementsPct, functionsPct, branchesPct) => {
          return (linesPct + statementsPct + functionsPct + branchesPct) / 4
        }
      )
    )
  )
).call()

'use strict'

const { AsyncObject } = require('./../index')

// Represented result is logged string
class LoggedTotalCoverageByJsonSummary extends AsyncObject {
  constructor (json, formula) {
    super(json, formula)
  }

  definedSyncCall () {
    return (json, formula) => {
      let totalValue = formula(json.total.lines.pct, json.total.statements.pct, json.total.functions.pct, json.total.branches.pct)
      let report = `Total coverage: ${totalValue}%`
      console.log(report)
      return report
    }
  }
}

module.exports = LoggedTotalCoverageByJsonSummary

'use strict'

const classChain = (obj, chain) => {
  if (!chain) {
    chain = []
  }
  if (typeof obj === 'function') {
    if (!obj.name || obj === Object) {
      return []
    }
    return classChain(Object.getPrototypeOf(obj).name, chain.concat(obj))
  }
  if (typeof obj === 'object' && obj !== null) {
    return classChain(obj.constructor, chain)
  }
  return []
}

module.exports = classChain

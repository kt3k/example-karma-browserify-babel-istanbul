const sum = require('../src/sum')
const assert = require('assert')

describe('sum', () => {
  it('sums up the all the given params', () => {
    assert(sum(1, 2) === 3)
    assert(sum(1, 2, 3) === 6)
    assert(sum(1, 2, 3, 4) === 10)
    assert(sum(1, 2, 3, 4, 5) === 15)
  })
})

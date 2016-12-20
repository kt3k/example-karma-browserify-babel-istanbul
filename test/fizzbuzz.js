const fizzbuzz = require('../src/fizzbuzz')
const assert = require('assert')

describe('fizzbuzz', () => {
  it('returns `Fizz` when the given param is a multiplier of 3', () => {
    assert(fizzbuzz(3) === 'Fizz')
    assert(fizzbuzz(6) === 'Fizz')
    assert(fizzbuzz(9) === 'Fizz')
  })

  it('returns `FizzBuzz` when the given param is a multiplier of 3 and 5', () => {
    assert(fizzbuzz(15) === 'FizzBuzz')
    assert(fizzbuzz(30) === 'FizzBuzz')
    assert(fizzbuzz(45) === 'FizzBuzz')
  })

  it('returns the given number when the number is not a multiplier of 3 or 5', () => {
    assert(fizzbuzz(1) === 1)
    assert(fizzbuzz(2) === 2)
    assert(fizzbuzz(4) === 4)
    assert(fizzbuzz(7) === 7)
    assert(fizzbuzz(8) === 8)
  })
})

/**
 * Returns the sum of the given params.
 */
module.exports = (...args) => {
  let sum = 0

  args.forEach(item => {
    sum += item * 2
  })

  return sum
}

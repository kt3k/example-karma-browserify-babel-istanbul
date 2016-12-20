/**
 * Returns 'Fizz' when the number is a multiplier of 3.
 * Returns 'Buzz' when the number is a multiplier of 5.
 * Returns 'FizzBuzz' when the number is a multiplier of 3 and 5.
 * Returns the number otherwize.
 */
module.exports = n => {
  if (n % 15 === 0) {
    return 'FizzBuzz'
  } else if (n % 5 === 0) {
    return 'Buzz'
  } else if (n % 3 === 0) {
    return 'Fizz'
  } else {
    return n
  }
}

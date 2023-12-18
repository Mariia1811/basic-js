const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let x = n + '';
  let max = 0;

  for (let i = 0; i < x.length; i++) {
    const numWithoutDigit = parseInt(x.slice(0, i) + x.slice(i + 1));
    if (numWithoutDigit > max) {
      max = numWithoutDigit;
    }
  }
 return max
}

module.exports = {
  deleteDigit
};

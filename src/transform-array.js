const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('\'arr\' parameter must be an instance of the Array!');
  }
  const result =[...arr].slice();

  if (arr[arr.length] === "--discard-next" || arr[arr.length] === "--double-next") {
    return arr.filter(el => el !== undefined && typeof el !== 'string')
  }

  if (arr[0] === "--discard-prev" || arr[0] === "--double-prev") {
    return arr.filter(el => el !== undefined && typeof el !== 'string')
  }

  for (let i = 0; i < result.length; i++) {
    switch (result[i]) {
      case '--discard-next':
        if (i !== result.length - 1) {
          result[i + 1] = undefined;
          i++;
        }
        break;
      case '--discard-prev':
        if (i !== 0 && result[i - 1] !== undefined) {
          result[i - 1] = undefined;
        }
        break;
      case '--double-next':
        if (i !== result.length - 1) {
          result[i] = result[i + 1];
        }
        break;
      case '--double-prev':
        if (i !== 0 && result[i - 1] !== undefined) {
          result[i] = result[i - 1];
        }
        break;
    }
  }

  return result.filter(el => el !== undefined && el !== '--discard-next' && el !== '--discard-prev' && el !== '--double-next' && el !== '--double-prev');
}

module.exports = {
  transform
};

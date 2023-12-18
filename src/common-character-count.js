const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  if(!s1 || !s2) {
    return 0
}
let count = 0;
const s1Arr = [...s1];
const s2Arr = [...s2];
for(let i = 0; i <=  s1Arr.length; i++) {
 const x = s2Arr.indexOf(s1Arr[i])
 if (x !== -1) {
  s2Arr.splice(x, 1);
  count ++
 }
}
return count
}

module.exports = {
  getCommonCharacterCount
};

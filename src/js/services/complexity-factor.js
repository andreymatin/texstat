/**
 * Get Complexity factor (Lexical Density)
 */
const complexityFactor = function (wordsUniqCount, wordsCount) {
  var cfVal = ((wordsUniqCount / wordsCount) * 100).toFixed(2);
  if (isNaN(cfVal)) {
    cfVal = 0;
  }

  return cfVal;
}

export default complexityFactor;



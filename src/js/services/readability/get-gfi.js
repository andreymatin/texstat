/**
 * Get GFI
 */
const getGfi = function (wordsAveragePerSentenceVal, wordsComplexCount, wordsCount) {
  var gfiVal = (0.4 * (wordsAveragePerSentenceVal + 100 * (wordsComplexCount / wordsCount))).toFixed(2);
  if (isNaN(gfiVal)) {
    gfiVal = 0;
  }

  return gfiVal;
}

export default getGfi;
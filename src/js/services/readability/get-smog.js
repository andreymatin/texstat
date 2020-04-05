/**
 * Get Smog
 */
const getSmog = function (wordsComplexCount, sentencesCount) {
  var smogVal = (1.043 * Math.sqrt(wordsComplexCount * (30 / sentencesCount)) + 3.1291).toFixed(2);
  if (isNaN(smogVal)) {
    smogVal = 0;
  }

  return smogVal;
}

export default getSmog;
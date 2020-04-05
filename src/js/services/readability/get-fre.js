/**
 * Get Fre
 */
const getFre = function (wordsCount, sentencesCount, syllablesCount) {
  var freVal = (206.835 - 1.015 * (wordsCount / sentencesCount) - 84.6 * (syllablesCount / wordsCount)).toFixed(2);
  if (isNaN(freVal)) {
    freVal = 0;
  }
  return freVal;
}

export default getFre;
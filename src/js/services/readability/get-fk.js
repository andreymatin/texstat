/**
 * Get Fk
 */
const getFk = function (wordsCount, sentencesCount, syllablesCount) {
  var fkVal = (0.39 * (wordsCount / sentencesCount) + 11.8 * (syllablesCount / wordsCount) - 15.59).toFixed(2);
  if (isNaN(fkVal)) {
    fkVal = 0;
  }

  return fkVal;
}

export default getFk;
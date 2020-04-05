/**
 * Get ARI
 */
const getAri = function (countLettersAndNumbers, wordsCount, sentencesCount) {
  var ariVal = (4.71 * (countLettersAndNumbers / wordsCount) + 0.5 * (wordsCount / sentencesCount) - 21.43).toFixed(2);
  if (isNaN(ariVal)) {
    ariVal = 0;
  }

  return ariVal;
}

export default getAri;
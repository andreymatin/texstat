/**
 * Average Words Length
 */
const averageWordsLength = function (wordsList, wordsCount) {
  // Average Word Length
  var wordsTotalLength = 0;
  for (var key in wordsList) {
    wordsTotalLength += wordsList[key].length;
  }

  var wordAverageCount = Math.round(wordsTotalLength / wordsCount);
  if (isNaN(wordAverageCount)) {
    wordAverageCount = 0;
  }

  return wordAverageCount;
}

export default averageWordsLength;



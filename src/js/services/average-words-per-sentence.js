/**
 * Average words per sentence
 */
const averageWordsPerSentence = function (wordsCount, sentencesCount) {
  var wordsAveragePerSentenceVal = Math.round(wordsCount / sentencesCount);
  if (isNaN(wordsAveragePerSentenceVal)) {
    wordsAveragePerSentenceVal = 0;
  }

  return wordsAveragePerSentenceVal;
}

export default averageWordsPerSentence;



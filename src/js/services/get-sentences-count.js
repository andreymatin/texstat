/**
 * Get Sentences Count
 */
const getSentencesCount = function (sentencesList) {

  var sentencesCount = 0;

  try {
    sentencesCount = sentencesList.length - 1;
  } catch (err) {
    sentencesCount = 0;
  }

  return sentencesCount;
}

export default getSentencesCount;
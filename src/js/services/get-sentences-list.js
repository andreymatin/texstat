/**
 * Get Sentences List
 */
const getSentencesList = function (str) {
  var sentencesList = str.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
  return sentencesList;
}

export default getSentencesList;
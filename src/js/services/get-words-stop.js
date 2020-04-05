/**
 * Get Stop Words
 */
const getStopWords = function (wordsUniqList, wordsImportantList) {
  var wordsStopList = _.difference(wordsUniqList, wordsImportantList);
  return wordsStopList;
}

export default getStopWords;
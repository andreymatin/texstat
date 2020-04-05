/**
 * Get Important Words
 */
const getImportantWords = function (wordsUniqList, stopWordsList) {
  var wordsImportantList = _.difference(wordsUniqList, stopWordsList);
  return wordsImportantList;
}

export default getImportantWords;